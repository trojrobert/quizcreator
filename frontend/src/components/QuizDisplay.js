import React from 'react';

export default function QuizDisplay({ quiz }) {
  if (!quiz) return <div>Generate a quiz to see it here!</div>;

  return (
    <div>
      <h2>Generated Quiz</h2>
      {quiz.questions.map((question, index) => (
        <div key={index}>
          <h3>{index + 1}. {question.text}</h3>
          <ul>
            {question.options.map((option, optIndex) => (
              <li key={optIndex}>{option}</li>
            ))}
          </ul>
          <p>Answer: {question.answer}</p>
        </div>
      ))}
    </div>
  );
}