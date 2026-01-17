
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMe }) => {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`
        max-w-[80%] md:max-w-[70%] px-3 py-2 rounded-2xl shadow-sm relative group
        ${isMe ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-slate-800 rounded-tl-none'}
      `}>
        {message.type === 'image' && message.imageUrl ? (
          <img src={message.imageUrl} alt="AI Sticker" className="rounded-lg mb-1 max-w-full h-auto" />
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        )}
        
        <div className={`flex items-center gap-1 mt-1 justify-end ${isMe ? 'text-emerald-100' : 'text-slate-400'}`}>
          <span className="text-[10px]">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isMe && (
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 13l4 4L24 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: message.status === 'read' ? 1 : 0.5 }} />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
