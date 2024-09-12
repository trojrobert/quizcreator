import React from 'react';

export default function QuizDisplay({ quiz }) {
  if (!quiz) {
    return (
      <div className="quiz-display empty">
        <p>Generate a quiz to see it here!</p>
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
      <style jsx>{`
        .quiz-display {
          color: #ffffff;
        }
        h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          color: #5E5CE6;
        }
        .question {
          background-color: #1c1c1e;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h3 {
          font-size: 1.2rem;
          margin-top: 0;
          margin-bottom: 1rem;
          color: #ffffff;
        }
        ul {
          list-style-type: none;
          padding-left: 0;
        }
        li {
          background-color: #2c2c2e;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          transition: background-color 0.3s ease;
        }
        li:hover {
          background-color: #3a3a3c;
        }
        .answer {
          margin-top: 1rem;
          font-weight: bold;
          color: #5E5CE6;
        }
      `}</style>
    </div>
  );
}