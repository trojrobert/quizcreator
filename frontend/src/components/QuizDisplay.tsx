import React, { useState, useEffect } from 'react';

export default function QuizDisplay({ quizSettings }) {
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const generateQuiz = async () => {
      try {
        const response = await fetch('https://1fume25nei.execute-api.us-east-1.amazonaws.com/prod/api/generate-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quizSettings),
        });

        if (!response.ok) {
          throw new Error('Failed to generate quiz');
        }

        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Error generating quiz:', error);
      }
    };

    if (quizSettings) {
      generateQuiz();
    }
  }, [quizSettings]);

  if (!quiz) {
    return (
      <div className="quiz-display empty">
        <p>Generated quiz will be seen here!</p>
        <style jsx>{`
          .quiz-display.empty {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-style: italic;
            color: #86868b;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="quiz-display">
      <h2>Generated Quiz</h2>
      {quiz.questions.map((question, index) => (
        <div key={index} className="question">
          <h3>{index + 1}. {question.text}</h3>
          <ul>
            {question.options.map((option, optIndex) => (
              <li key={optIndex}>{option}</li>
            ))}
          </ul>
          <p className="answer">Answer: {question.answer}</p>
        </div>
      ))}
    </div>
  );
}
