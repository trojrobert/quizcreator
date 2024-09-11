"use client"
import QuizDisplay from "@/components/QuizDisplay";
import QuizSettings, { Setting } from "@/components/QuizSettings";
import { useState } from "react";

export default function Home() {
  const [quiz, setQuiz] = useState([]);

  const generateQuiz = async (settings: Setting) => {
    // TODO: Implement API call to backend
    const response = await fetch('/api/generate-quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    const data = await response.json();
    setQuiz(data);
  };

  return (
    <div className="container">
      <div className="left-column">
        <QuizSettings onGenerate={generateQuiz} />
      </div>
      <div className="right-column">
        <QuizDisplay quiz={quiz} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
        }
        .left-column, .right-column {
          flex: 1;
          padding: 20px;
        }
        .left-column {
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
}
