
import React from 'react';
import { Language, LanguageOption } from '../types';
import { UI_TEXT, LANGUAGES } from '../constants';
import { CertificateIcon } from './icons';

interface InstructionsScreenProps {
  onContinue: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onContinue, language, setLanguage }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-slate-800">
                {UI_TEXT.instructionsTitle[language]}
            </h2>
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-slate-100 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                aria-label="Select language"
            >
            {LANGUAGES.map((lang: LanguageOption) => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
        
        <ul className="space-y-4 text-slate-600 mb-8">
            <li className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>{UI_TEXT.instruction1[language]}</span>
            </li>
            <li className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>{UI_TEXT.instruction2[language]}</span>
            </li>
            <li className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>{UI_TEXT.instruction3[language]}</span>
            </li>
            <li className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>{UI_TEXT.instruction4[language]}</span>
            </li>
            <li className="flex items-start">
                <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>{UI_TEXT.instruction5[language]}</span>
            </li>
        </ul>

        <button
          onClick={onContinue}
          className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
        >
          {UI_TEXT.continueToQuiz[language]}
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ArrowRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

export default InstructionsScreen;
