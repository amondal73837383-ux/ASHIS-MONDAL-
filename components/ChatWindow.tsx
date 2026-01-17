
import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message } from '../types';
import { CURRENT_USER_ID } from '../constants';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { getConversationSummary } from '../services/geminiService';

interface ChatWindowProps {
  chat: Chat;
  onSendMessage: (text: string, type?: 'text' | 'image', imageUrl?: string) => void;
  onBack: () => void;
  isMobile: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onSendMessage, onBack, isMobile }) => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const result = await getConversationSummary(chat.messages);
    setSummary(result);
    setIsSummarizing(false);
    setTimeout(() => setSummary(null), 10000); // Hide summary after 10s
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] relative overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-white shadow-sm flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          {isMobile && (
            <button onClick={onBack} className="p-2 -ml-1 text-slate-600 hover:bg-slate-100 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )}
          <img src={chat.contact.avatar} alt={chat.contact.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h2 className="font-semibold text-slate-800 leading-tight">{chat.contact.name}</h2>
            <p className="text-xs text-emerald-600 font-medium">
              {chat.contact.online ? 'Online' : `Last seen ${chat.contact.lastActive}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSummarize}
            disabled={isSummarizing}
            title="AI Summary"
            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-all disabled:opacity-50"
          >
            {isSummarizing ? (
              <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            )}
          </button>
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>
      </div>

      {/* AI Summary Banner */}
      {summary && (
        <div className="absolute top-16 left-4 right-4 bg-emerald-600 text-white p-4 rounded-xl shadow-lg z-30 animate-bounce-subtle">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-bold uppercase tracking-wider opacity-80">AI Conversation Summary</span>
            <button onClick={() => setSummary(null)} className="hover:opacity-70">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
          </div>
          <div className="text-sm whitespace-pre-wrap">{summary}</div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]">
        {chat.messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            isMe={message.senderId === CURRENT_USER_ID} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} chatHistory={chat.messages} />
    </div>
  );
};

export default ChatWindow;
