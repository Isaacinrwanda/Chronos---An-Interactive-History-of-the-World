import React, { useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { AppState, Language, HistoricalEra } from './types';
import CoverScreen from './components/CoverScreen';
import ChatScreen from './components/QuizScreen'; // Re-using QuizScreen as ChatScreen

const App: React.FC = () => {
  const [appState, setAppState] = useLocalStorage<AppState>('kellenHistoryAppState', 'cover');
  const [language, setLanguage] = useLocalStorage<Language>('kellenHistoryAppLang', 'en');
  const [selectedEra, setSelectedEra] = useLocalStorage<HistoricalEra | null>('kellenHistorySelectedEra', null);

  const startChat = useCallback(() => {
    setSelectedEra(null);
    setAppState('chat');
  }, [setAppState, setSelectedEra]);

  const selectEraAndChat = useCallback((era: HistoricalEra) => {
    setSelectedEra(era);
    setAppState('chat');
  }, [setAppState, setSelectedEra]);

  const goHome = useCallback(() => {
    setSelectedEra(null);
    setAppState('cover');
  }, [setAppState, setSelectedEra]);


  const renderScreen = () => {
    switch (appState) {
      case 'cover':
        return <CoverScreen onStartChat={startChat} onSelectEra={selectEraAndChat} language={language} setLanguage={setLanguage} />;
      case 'chat':
        return <ChatScreen language={language} onBack={goHome} selectedEra={selectedEra} />;
      default:
        return <CoverScreen onStartChat={startChat} onSelectEra={selectEraAndChat} language={language} setLanguage={setLanguage} />;
    }
  };

  return <main>{renderScreen()}</main>;
};

export default App;