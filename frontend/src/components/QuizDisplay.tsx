import { type } from "node:os";
import React from "react";

type Question = { options: []; answer: string, text: string }


export default function QuizDisplay({ quiz }: { quiz: { questions: Question[] } }) {
  return (
    <div>
      <h2>Generated Quiz</h2>
      {quiz?.questions?.map((question: Question, index) => (
        <div key={index}>
          <h3>
            {index + 1}. {question.text}
          </h3>
          <ul>
            {question.options.map((option, optIndex) => (
              <li key={optIndex}>{option}</li>
            ))}
          </ul>
          <p>Answer: {question.answer}</p>
        </div>
      ))}
    </div>
  )
}