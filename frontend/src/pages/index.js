import React, { useState } from 'react';
import QuizSettings from '../components/QuizSettings';
import QuizDisplay from '../components/QuizDisplay';

export default function Home() {
  const [quiz, setQuiz] = useState(null);

  const generateQuiz = async (settings) => {
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }
      const data = await response.json();
      setQuiz(data);
    } catch (error) {
      console.error('Error generating quiz:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>QuizCrafter AI</h1>
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