import React from 'react';

export default function QuizDisplay({ quiz }) {
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
