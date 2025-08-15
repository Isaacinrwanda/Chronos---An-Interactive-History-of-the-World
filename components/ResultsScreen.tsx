
import React, { useState, useRef } from 'react';
import { Question, Language } from '../types';
import { UI_TEXT } from '../constants';
import Certificate from './Certificate';
import { DownloadIcon, CheckCircleIcon, XCircleIcon, RestartIcon } from './icons';

declare const html2canvas: any;
declare const jspdf: any;


interface ResultsScreenProps {
  questions: Question[];
  answers: (number | null)[];
  language: Language;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  restartQuiz: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ questions, answers, language, userName, setUserName, restartQuiz }) => {
  const [nameInput, setNameInput] = useState(userName);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const score = Math.round((answers.filter((ans, i) => ans === questions[i].correctAnswerIndex).length / questions.length) * 100);
  const passed = score >= 60;

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUserName(nameInput.trim());
    }
  };

  const downloadPdf = () => {
    const input = document.getElementById('certificate-to-download');
    if (!input) return;
    setIsDownloading(true);

    html2canvas(input, { scale: 2 }) // Higher scale for better quality
      .then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Kellen-Certificate.pdf');
        setIsDownloading(false);
      }).catch(() => setIsDownloading(false));
  };

  const getOptionClassName = (qIndex: number, oIndex: number) => {
    const isCorrect = questions[qIndex].correctAnswerIndex === oIndex;
    const isSelected = answers[qIndex] === oIndex;

    if (isCorrect) {
      return 'bg-green-100 border-green-400 text-green-800';
    }
    if (isSelected && !isCorrect) {
      return 'bg-red-100 border-red-400 text-red-800';
    }
    return 'bg-slate-100 border-slate-300';
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{UI_TEXT.resultsTitle[language]}</h2>
          <p className="text-lg text-slate-500 mb-4">{UI_TEXT.yourScore[language]}</p>
          <div className={`text-7xl font-bold mb-4 ${passed ? 'text-green-500' : 'text-red-500'}`}>{score}%</div>
          <p className="text-xl">
            {passed ? (
              <span className="text-green-600 flex items-center justify-center"><CheckCircleIcon className="w-7 h-7 mr-2" />{UI_TEXT.passMessage[language]}</span>
            ) : (
              <span className="text-red-600 flex items-center justify-center"><XCircleIcon className="w-7 h-7 mr-2" />{UI_TEXT.failMessage[language]}</span>
            )}
          </p>
        </div>
        
        {passed && (
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            {userName ? (
              <>
                <Certificate name={userName} score={score} date={new Date().toLocaleDateString()} />
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button onClick={downloadPdf} disabled={isDownloading} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-slate-400">
                    <DownloadIcon className="w-6 h-6" />
                    {isDownloading ? 'Downloading...' : UI_TEXT.downloadPDF[language]}
                  </button>
                  <button onClick={restartQuiz} className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors">
                    <RestartIcon className="w-4 h-4" /> {UI_TEXT.restart[language]}
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleNameSubmit} className="text-center">
                <label className="text-lg text-slate-700 mb-4 block font-semibold">{UI_TEXT.enterFullName[language]}</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g., Jean-Luc Picard"
                  className="w-full max-w-md mx-auto text-center p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition">
                  {UI_TEXT.generateCertificate[language]}
                </button>
              </form>
            )}
          </div>
        )}

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-800">{UI_TEXT.reviewAnswers[language]}</h3>
            {!passed && <button onClick={restartQuiz} className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors">
              <RestartIcon className="w-4 h-4" /> {UI_TEXT.restart[language]}
            </button>}
          </div>
          <div className="space-y-8">
            {questions.map((q, i) => (
              <div key={q.id}>
                <p className="font-semibold text-lg text-slate-800 mb-4">
                  {i + 1}. {q.question[language]}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <div key={j} className={`p-3 border rounded-lg flex items-center ${getOptionClassName(i, j)}`}>
                      {answers[i] === j && j !== q.correctAnswerIndex && <XCircleIcon className="w-5 h-5 mr-3 flex-shrink-0" />}
                      {j === q.correctAnswerIndex && <CheckCircleIcon className="w-5 h-5 mr-3 flex-shrink-0" />}
                      <span className="flex-grow">{opt[language]}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-r-lg">
                  <p className="font-bold">{UI_TEXT.explanation[language]}:</p>
                  <p>{q.explanation[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
