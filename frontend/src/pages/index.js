import React, { useState } from 'react';
import QuizSettings from '../components/QuizSettings';
import QuizDisplay from '../components/QuizDisplay';
import axios from 'axios';

export default function Home() {
  const [quiz, setQuiz] = useState(null);

  const generateQuiz = async (settings) => {
    console.log(settings);
    try {
      const response = await axios.post(
        'https://82tbo22h05.execute-api.us-east-1.amazonaws.com/prod/api/generate-quiz',
        {
          "title":"",
          "numQuestions":3,
          "numOptions":3,
          "difficulty":"hard",
          "text":"175.000 € \nKaufpreis66 \nWohnfläche (ca.)2\nZimmer\nImmobilienart\nKategorie\nKaufpreis\nWohnfläche\nZimmer\nBezug\nKäuferprovisionZusammenfassung\nWohnung\nEtagenwohnung\n175.000 €\nca. 66,00 m²\n2\nsofort\n3,57% incl. MWSTAnbieter\nImmobilien Walther Leipzig \nWittenberger Straße 15 \n04129 Leipzig\nAnsprechpartner\nHerr Sven Walther \nTelefon: 0341/9188518 \nFax: 0341/9188519 \n2­Raum Wohnung++ 2.OG++ Balkon++ EBK++ ruhige Seitenstraße++sofort frei\n04177 Leipzig (Altlindenau), Karl­Ferlemann­Straße 51\nBalkon, Kelleranteil, Einbauküche, Zentralheizung, frei\nEnergie / Versorgung\nEnergieausweis für diesen Gebäudetyp nicht\nnotwendigEnergieträger:  Gas\nZentralheizung\nObjektbeschreibung Die zum Verkauf stehende 2 ZKB Wohnung befindet sich im 2."
       },
      );
      setQuiz(response.data);
    } catch (error) {
      console.error('Error generating quiz:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Quiz Gen AI</h1>
        <p>Create quizzes from documents, URLs, or topics with AI assistance</p>
      </header>
      <main className="content-container">
        <div className="left-column">
          <QuizSettings onGenerate={generateQuiz} />
        </div>
        <div className="right-column">
          <QuizDisplay quiz={quiz} />
        </div>
      </main>
      <footer className="app-footer">
        <p>© Robert John.</p>
      </footer>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background-color: #000;
          color: #fff;
        }
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .app-header {
          background-color: rgba(29, 29, 31, 0.72);
          backdrop-filter: saturate(180%) blur(20px);
          padding: 20px;
          text-align: center;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .app-header h1 {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 600;
          background: linear-gradient(to right, #5E5CE6, #00FFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .app-header p {
          margin: 10px 0 0;
          font-size: 1rem;
          color: #ffffff;
        }
        .content-container {
          display: flex;
          flex: 1;
          padding: 20px;
          gap: 20px;
        }
        .left-column {
          flex: 0 0 30%;
          background-color: rgba(29, 29, 31, 0.72);
          border-radius: 12px;
          padding: 20px;
          overflow-y: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .right-column {
          flex: 0 0 70%;
          background-color: rgba(29, 29, 31, 0.72);
          border-radius: 12px;
          padding: 20px;
          overflow-y: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .app-footer {
          background-color: rgba(29, 29, 31, 0.72);
          backdrop-filter: saturate(180%) blur(20px);
          color: #ffffff;
          text-align: center;
          padding: 10px;
          font-size: 0.9rem;
        }
        @media (max-width: 768px) {
          .content-container {
            flex-direction: column;
          }
          .left-column, .right-column {
            flex: 1 1 auto;
          }
        }
      `}</style>
    </div>
  );
}