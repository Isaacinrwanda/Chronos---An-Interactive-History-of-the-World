export type AppState = 'cover' | 'chat';

export type Language = 'en' | 'rw' | 'fr' | 'sw' | 'es' | 'ar' | 'zh' | 'hi' | 'pt' | 'bn' | 'ru' | 'ja' | 'de' | 'ko' | 'tr' | 'it' | 'id';

export type Translation = {
  [key in Language]: string;
};

export interface LanguageOption {
  code: Language;
  name: string;
}

export interface HistoricalEra {
  id: string;
  title: Translation;
  period: Translation;
  description: Translation;
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Question {
  id: number;
  question: Translation;
  options: Translation[];
  correctAnswerIndex: number;
  explanation: Translation;
}