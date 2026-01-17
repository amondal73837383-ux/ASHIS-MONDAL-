
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INITIAL_CHATS, CURRENT_USER_ID } from './constants';
import { Chat, Message } from './types';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Splash from './components/Splash';

const App: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    const timer = setTimeout(() => setShowSplash(false), 2000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  const handleSendMessage = useCallback((text: string, type: 'text' | 'image' = 'text', imageUrl?: string) => {
    if (!activeChatId) return;

    const newMessage: Message = {
      id: `m_${Date.now()}`,
      senderId: CURRENT_USER_ID,
      text,
      timestamp: new Date(),
      type,
      imageUrl,
      status: 'sent',
    };

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          contact: { ...chat.contact, lastMessage: text }
        };
      }
      return chat;
    }));
  }, [activeChatId]);

  const selectChat = (id: string) => {
    setActiveChatId(id);
    setChats(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c));
  };

  const handleBack = () => setActiveChatId(null);

  if (showSplash) return <Splash />;

  return (
    <div className="flex h-screen bg-emerald-50 text-slate-900 overflow-hidden">
      {/* Sidebar - hidden on mobile if a chat is active */}
      <div className={`
        ${isMobileView && activeChatId ? 'hidden' : 'flex'}
        ${isMobileView ? 'w-full' : 'w-1/3 lg:w-1/4'}
        border-r border-emerald-100 flex-col bg-white shadow-xl z-20
      `}>
        <Sidebar 
          chats={chats} 
          activeChatId={activeChatId} 
          onSelectChat={selectChat} 
        />
      </div>

      {/* Main Chat Area */}
      <div className={`
        ${isMobileView && !activeChatId ? 'hidden' : 'flex'}
        flex-1 flex-col relative
      `}>
        {activeChat ? (
          <ChatWindow 
            chat={activeChat} 
            onSendMessage={handleSendMessage}
            onBack={handleBack}
            isMobile={isMobileView}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-emerald-800 mb-2">Welcome to Crops</h2>
            <p className="text-slate-500 max-w-md">
              Select a conversation to start nurturing your ideas. Our AI is ready to help you grow your thoughts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
