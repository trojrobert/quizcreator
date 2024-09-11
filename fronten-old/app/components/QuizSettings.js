import React, { useState } from 'react';

export default function QuizSettings({ onGenerate }) {
  const [numQuestions, setNumQuestions] = useState(2);
  const [numOptions, setNumOptions] = useState(5);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalText = text;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:8000/api/upload-pdf', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Failed to upload PDF');
        }
        const data = await response.json();
        finalText += ' ' + data.text;
      } catch (error) {
        console.error('Error uploading PDF:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }

    onGenerate({ numQuestions, numOptions, text: finalText });
  };

  return (
    <div className="quiz-settings">
      <h2>Create engaging quizzes in seconds</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="numQuestions">
            How many questions do you want to create?
          </label>
          <input
            id="numQuestions"
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            min="1"
            max="20"
          />
        </div>
        <div className="form-group">
          <label htmlFor="numOptions">
            How many options per question do you want?
          </label>
          <input
            id="numOptions"
            type="number"
            value={numOptions}
            onChange={(e) => setNumOptions(Number(e.target.value))}
            min="2"
            max="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">
            What text do you want to generate questions from?
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">
            Upload a PDF (optional):
          </label>
          <input
            id="file"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit">Generate</button>
      </form>
      <style jsx>{`
        .quiz-settings {
          background-color: #f0f0f0;
          padding: 20px;
          border-radius: 8px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input, textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
}