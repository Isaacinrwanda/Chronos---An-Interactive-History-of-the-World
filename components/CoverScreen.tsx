import React from 'react';
import { UI_TEXT, HISTORICAL_ERAS, LANGUAGES } from '../constants';
import { Language, LanguageOption, HistoricalEra } from '../types';

interface CoverScreenProps {
  onStartChat: () => void;
  onSelectEra: (era: HistoricalEra) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const CoverScreen: React.FC<CoverScreenProps> = ({ onStartChat, onSelectEra, language, setLanguage }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4 bg-fixed" style={{backgroundImage: "url('https://images.unsplash.com/photo-1554034483-263a2a89918b?q=80&w=1920&auto=format&fit=crop')"}}>
        <div className="absolute top-4 right-4 z-10">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                aria-label="Select language"
            >
            {LANGUAGES.map((lang: LanguageOption) => (
              <option key={lang.code} value={lang.code} className="text-black">{lang.name}</option>
            ))}
          </select>
        </div>

      <div className="bg-black/50 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-5xl w-full">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
          {UI_TEXT.mainTitle[language]}
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-8">
          {UI_TEXT.welcomeMessage[language]}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {HISTORICAL_ERAS.map(era => (
                <button
                    key={era.id}
                    onClick={() => onSelectEra(era)}
                    className="bg-cover bg-center rounded-lg shadow-lg h-48 flex flex-col justify-end p-4 text-white text-left transform hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50"
                    style={{backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url('${era.image}')`}}
                    aria-label={`Learn more about ${era.title[language]}`}
                >
                    <h3 className="font-bold text-lg">{era.title[language]}</h3>
                    <p className="text-sm text-slate-300">{era.period[language]}</p>
                </button>
            ))}
        </div>

        <button
          onClick={onStartChat}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-lg"
        >
          {UI_TEXT.startChat[language]}
        </button>
      </div>
    </div>
  );
};

export default CoverScreen;