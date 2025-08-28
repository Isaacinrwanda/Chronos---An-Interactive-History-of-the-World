
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage, Language, HistoricalEra } from '../types';
import { UI_TEXT } from '../constants';
import { ArrowLeftIcon, PaperAirplaneIcon } from './icons';

interface ChatScreenProps {
  language: Language;
  onBack: () => void;
  selectedEra: HistoricalEra | null;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ language, onBack, selectedEra }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isInitialPromptSent = useRef(false);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim() || !chat) return;

    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      const response = await chat.sendMessage({ message });
      const text = response.text;
      setChatHistory(prev => [...prev, { role: 'model', content: text }]);
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { role: 'model', content: 'I seem to have lost my train of thought. Could you please ask that again?' }]);
    } finally {
      setIsLoading(false);
    }
  }, [chat]);

  useEffect(() => {
    if (!process.env.API_KEY) {
      setChatHistory([{
        role: 'model',
        content: 'Error: This application has not been configured correctly. Please contact the administrator to set up the API key.'
      }]);
      return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const newChat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'You are a world-class historian. Answer the user\'s questions about world history with clarity, accuracy, and engaging details. Format your answers with markdown for readability.'
      },
    });
    setChat(newChat);
    setChatHistory([{
      role: 'model',
      content: 'Greetings! I am Chronos, your AI historian. How may I illuminate the annals of the past for you today?'
    }]);
  }, []);

  useEffect(() => {
    if (chat && selectedEra && !isInitialPromptSent.current) {
        isInitialPromptSent.current = true;
        const prompt = `Tell me more about the "${selectedEra.title[language]}" era.`;
        sendMessage(prompt);
    }
  }, [chat, selectedEra, language, sendMessage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isLoading]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !userInput.trim()) return;
    const message = userInput;
    setUserInput('');
    await sendMessage(message);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100">
      <header className="bg-white shadow-md p-4 flex items-center gap-4 z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-slate-200">
          <ArrowLeftIcon className="w-6 h-6 text-slate-600" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">{UI_TEXT.aiHistorianTitle[language]}</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">A</div>}
              <div
                className={`max-w-xl p-3 rounded-2xl whitespace-pre-wrap ${
                  msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-slate-800 shadow-sm rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
               <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">A</div>
              <div className="max-w-xl p-3 rounded-2xl bg-white text-slate-800 shadow-sm rounded-bl-none">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-0"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="bg-white p-4 border-t">
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={UI_TEXT.chatPlaceholder[language]}
            className="w-full p-3 border border-slate-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={isLoading || !chat}
          />
          <button type="submit" disabled={isLoading || !userInput.trim() || !chat} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors">
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatScreen;
