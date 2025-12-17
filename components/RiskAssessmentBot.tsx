import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { ChatMessage, RiskLevel } from '../types';
import { createRiskChatSession } from '../services/geminiService';
import { Chat, GenerateContentResponse } from "@google/genai";

interface RiskAssessmentBotProps {
  setAppRiskProfile: (level: RiskLevel) => void;
}

const RiskAssessmentBot: React.FC<RiskAssessmentBotProps> = ({ setAppRiskProfile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'system',
      text: "Hi! I'm your EasyWealth financial companion. To help you best, I need to understand how you handle money and risk. Ready for a quick chat?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const session = createRiskChatSession();
    if (session) {
        setChatSession(session);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const parseRiskFromResponse = (text: string) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('risk profile is conservative') || lowerText.includes('risk profile is low')) {
      setAppRiskProfile(RiskLevel.LOW);
    } else if (lowerText.includes('risk profile is balanced') || lowerText.includes('risk profile is moderate')) {
      setAppRiskProfile(RiskLevel.MODERATE);
    } else if (lowerText.includes('risk profile is aggressive') || lowerText.includes('risk profile is high')) {
      setAppRiskProfile(RiskLevel.AGGRESSIVE);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Fixed: Pass message as object { message: string }
      const result: GenerateContentResponse = await chatSession.sendMessage({ message: userMsg.text });
      const botText = result.text || "I'm having trouble thinking right now.";

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: botText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      parseRiskFromResponse(botText);
    } catch (error) {
      console.error("Chat Error", error);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting to the server. Please check your API Key.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <header className="bg-white p-6 rounded-t-2xl shadow-sm border-b border-slate-100 shrink-0">
        <h2 className="text-2xl font-bold text-slate-800">Risk Analysis Bot</h2>
        <p className="text-slate-500">Chat to discover your financial personality</p>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-[85%] ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-t-2xl rounded-bl-2xl'
                  : 'bg-white text-slate-700 border border-slate-200 rounded-t-2xl rounded-br-2xl shadow-sm'
              } p-4`}
            >
              <div className="mr-2 mt-1 shrink-0">
                 {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-full py-2 px-4 shadow-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your answer..."
            className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-emerald-500 focus:border-emerald-500 block w-full p-3"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white rounded-xl p-3 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentBot;