
import React, { useState } from 'react';
import { Chat } from '../types';

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ chats, activeChatId, onSelectChat }) => {
  const [search, setSearch] = useState('');

  const filteredChats = chats.filter(chat => 
    chat.contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Crops
        </h1>
        <div className="flex gap-3">
          <button className="p-1 hover:bg-emerald-700 rounded-full transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map(chat => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full p-4 flex items-center gap-3 hover:bg-emerald-50 transition-colors border-b border-slate-50 ${activeChatId === chat.id ? 'bg-emerald-50' : ''}`}
          >
            <div className="relative">
              <img src={chat.contact.avatar} alt={chat.contact.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
              {chat.contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-slate-800 truncate">{chat.contact.name}</h3>
                <span className="text-[10px] text-slate-400">{chat.contact.lastActive}</span>
              </div>
              <p className="text-sm text-slate-500 truncate">{chat.contact.lastMessage}</p>
            </div>
            {chat.unreadCount > 0 && (
              <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">{chat.unreadCount}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
