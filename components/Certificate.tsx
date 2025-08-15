
import React from 'react';

interface CertificateProps {
  name: string;
  score: number;
  date: string;
}

// Base64 encoded SVG for an offline-first signature image
const signatureImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgMjAwIj48cGF0aCBkPSJNMzguMiA3OS4zYy0xLjYtMTIuMyA0LjEtMjQuMyAxNC42LTMyLjggMTMuNS0xMS4xIDMyLjctMTUgNDcuMy04LjEgMTYuNyA3LjkgMjkuMyAyNC41IDQyLjMgMzggMTAuMiAxMC42IDIxLjUgMjAgMzMuNSAyNy45IDEzLjEgOC43IDI4LjMgMTQuNyA0My45IDE4LjEgMTMuOCAyLjkgMjggMy42IDQxLjggMS45IDE4LjktMi4xIDM2LjYtMTEgNTIuNi0yMS4xIDEzLjUtOC41IDI2LTE5LjcgMzYuNC0zMi42IDQuNS01LjYgOC41LTExLjggMTEuOC0xOC40IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+';

const Certificate: React.FC<CertificateProps> = ({ name, score, date }) => {
  return (
    <div
      id="certificate-to-download"
      className="bg-white p-8 md:p-12 border-[10px] border-blue-800 aspect-[297/210] w-full max-w-4xl mx-auto"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="border-2 border-blue-400 w-full h-full p-8 flex flex-col items-center justify-between text-center relative">
        <div className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-5" style={{backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/1/17/Coat_of_arms_of_Rwanda.svg')"}}></div>
        
        <div>
          <h2 className="text-xl font-semibold text-slate-600 tracking-widest">CERTIFICATE OF COMPLETION</h2>
          <p className="text-slate-500 mt-2">This certificate is proudly presented to</p>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 my-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          {name}
        </h1>

        <p className="text-lg text-slate-600">
          for successfully passing the <span className="font-bold">Rwanda Access Portal Quiz</span> with a score of <span className="font-bold">{score}%</span>.
        </p>

        <div className="w-full flex justify-between items-end mt-12 text-sm">
          <div className="text-left">
            <p className="font-bold text-slate-700 border-t-2 border-slate-400 pt-2">Date</p>
            <p className="text-slate-600">{date}</p>
          </div>
          <div className="text-right">
            <img src={signatureImage} alt="Signature" className="h-16 w-48 mx-auto -mb-4" />
            <p className="font-bold text-slate-700 border-t-2 border-slate-400 pt-2">Signed by</p>
            <p className="text-slate-600">Kellen Official, Director of Access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
