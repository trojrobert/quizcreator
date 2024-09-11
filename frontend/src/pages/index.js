import React, { useState } from 'react';
import QuizSettings from '../components/QuizSettings';
import QuizDisplay from '../components/QuizDisplay';

export default function Home() {
  const [quiz, setQuiz] = useState(null);

  const generateQuiz = async (settings) => {
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

// components/QuizSettings.js
import React, { useState } from 'react';

export default function QuizSettings({ onGenerate }) {
  const [numQuestions, setNumQuestions] = useState(2);
  const [numOptions, setNumOptions] = useState(5);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ numQuestions, numOptions, text });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create engaging quizzes in seconds</h2>
      <div>
        <label>
          How many questions do you want to create?
          <input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            max="20"
          />
        </label>
      </div>
      <div>
        <label>
          How many options per question do you want?
          <input
            type="number"
            value={numOptions}
            onChange={(e) => setNumOptions(e.target.value)}
            max="5"
          />
        </label>
      </div>
      <div>
        <label>
          What text do you want to generate questions from?
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Generate</button>
    </form>
  );
}

// components/QuizDisplay.js
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