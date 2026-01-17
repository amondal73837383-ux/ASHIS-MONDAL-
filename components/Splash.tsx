
import React from 'react';

const Splash: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-emerald-600 flex flex-col items-center justify-center text-white p-6 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping scale-150"></div>
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl relative z-10">
          <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-black tracking-tighter mb-2">CROPS</h1>
      <p className="text-emerald-100 text-lg opacity-80 max-w-xs leading-tight">
        Nurturing conversations with the power of AI.
      </p>
      
      <div className="mt-12 flex flex-col items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <span className="text-xs uppercase tracking-widest opacity-60 font-bold">Fertilizing Context</span>
      </div>
    </div>
  );
};

export default Splash;
