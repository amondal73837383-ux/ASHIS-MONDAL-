
import React, { useState, useRef } from 'react';
import { getSmartReply, generateCropImage } from '../services/geminiService';
import { Message } from '../types';

interface ChatInputProps {
  onSendMessage: (text: string, type?: 'text' | 'image', imageUrl?: string) => void;
  chatHistory: Message[];
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, chatHistory }) => {
  const [input, setInput] = useState('');
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [isGeneratingSticker, setIsGeneratingSticker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  const handleSmartReply = async () => {
    setIsGeneratingReply(true);
    const context = chatHistory.slice(-5).map(m => `${m.senderId === 'me' ? 'Me' : 'Them'}: ${m.text}`).join('\n');
    const reply = await getSmartReply(context);
    setInput(reply);
    setIsGeneratingReply(false);
  };

  const handleCreateSticker = async () => {
    if (!input.trim()) return;
    setIsGeneratingSticker(true);
    const stickerUrl = await generateCropImage(input);
    if (stickerUrl) {
      onSendMessage(`Created a sticker for: ${input}`, 'image', stickerUrl);
      setInput('');
    }
    setIsGeneratingSticker(false);
  };

  return (
    <div className="p-4 bg-white border-t border-slate-100 relative">
      <div className="flex items-end gap-2 max-w-5xl mx-auto relative">
        <div className="flex gap-1 mb-1">
          <button 
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
          </button>
          <input type="file" ref={fileInputRef} className="hidden" />
        </div>

        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
            placeholder="Type a message or AI prompt..."
            className="w-full bg-slate-100 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-emerald-500 min-h-[44px] max-h-32 resize-none"
            rows={1}
          />
          
          <div className="absolute right-2 top-2 flex gap-1">
             <button 
                onClick={handleSmartReply}
                disabled={isGeneratingReply}
                title="Smart Reply"
                className="p-1.5 text-emerald-600 bg-white shadow-sm hover:shadow-md rounded-lg disabled:opacity-50 transition-all"
              >
                {isGeneratingReply ? (
                  <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                )}
              </button>
              <button 
                onClick={handleCreateSticker}
                disabled={isGeneratingSticker || !input.trim()}
                title="Create Sticker"
                className="p-1.5 text-amber-600 bg-white shadow-sm hover:shadow-md rounded-lg disabled:opacity-50 transition-all"
              >
                {isGeneratingSticker ? (
                  <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                )}
              </button>
          </div>
        </div>

        <button 
          onClick={() => handleSubmit()}
          disabled={!input.trim()}
          className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:bg-slate-300 shadow-md transition-all active:scale-95 mb-1"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </button>
      </div>
      
      {/* Quick context hints */}
      <div className="flex gap-2 mt-2 max-w-5xl mx-auto overflow-x-auto pb-1 scrollbar-hide">
        {['Great!', 'Thanks.', 'Checking now.', '🌾 Harvesting?', '🌱 Seeding?'].map(chip => (
          <button 
            key={chip}
            onClick={() => setInput(chip)}
            className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-medium whitespace-nowrap hover:bg-emerald-100 transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;
