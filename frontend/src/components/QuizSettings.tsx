import React, { useState } from 'react';

export default function QuizSettings({ onGenerate }) {
  const [contentType, setContentType] = useState('text');
  const [title, setTitle] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [numOptions, setNumOptions] = useState(4);
  const [difficulty, setDifficulty] = useState('medium');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(''); // For success or error messages
  const [uploadedFileName, setUploadedFileName] = useState(''); // To store the file name

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalText = text;

    if (contentType === 'pdf' && file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('https://82tbo22h05.execute-api.us-east-1.amazonaws.com/prod/api/upload-pdf', {
          method: 'POST',
          mode: 'no-cors',
          body: formData,
        });

        if (!response.ok) {
          const errorMessage = `Failed to upload PDF: ${response.statusText}`;
          console.error(errorMessage);
          setUploadStatus(errorMessage); // Set the error message to be displayed on the frontend
          throw new Error(errorMessage);
        }

        const data = await response.json();
        finalText = data.text;

        setUploadStatus('File uploaded successfully'); // Set the success message
        setUploadedFileName(file.name); // Display the uploaded file name
        console.log('File uploaded successfully:', data);
      } catch (error) {
        console.error('Error uploading PDF:', error);
        setUploadStatus(`Error uploading PDF: ${error.message}`); // Display the error message on the frontend
        return; // Exit the function on failure
      }
    } else if (contentType === 'pdf' && !file) {
      const noFileError = 'No file selected for upload.';
      console.error(noFileError);
      setUploadStatus(noFileError); // Display the error message on the frontend
      return; // Exit the function if no file is selected
    }

    const data = {
      title,
      numQuestions,
      numOptions,
      difficulty,
      text: finalText,
    }

    // Proceed to generate the quiz after a successful file upload or if no file is needed.
    onGenerate(data);
  };

  return (
    <div className="quiz-settings">
      <h2>Quiz Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contentType">Content Source</label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="pdf">Upload PDF</option>
            <option value="text">Enter Content</option>
            <option value="topic">Random Topic</option>
          </select>
        </div>

        {contentType === 'text' && (
          <div className="form-group">
            <label htmlFor="text">Source Text</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text for quiz generation"
              className='quiz-text-area'
              rows='4'
            />
          </div>
        )}

        {contentType === 'pdf' && (
          <div className="form-group">
            <label htmlFor="file" className="file-input-label">
              Upload PDF
              <input
                id="file"
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="file-input"
              />
            </label>
          </div>
        )}

        {contentType === 'topic' && (
          <div className="form-group">
            <label htmlFor="topic">Random Topic</label>
            <input
              id="topic"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a topic for quiz generation"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title">Quiz Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter quiz title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="numQuestions">Number of Questions</label>
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
          <label htmlFor="numOptions">Options per Question</label>
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
          <label htmlFor="difficulty">Difficulty Level</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button type="submit">Generate Quiz</button>
      </form>

      <style jsx>{`
        .quiz-settings {
          color: #ffffff;
        }
        h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #5E5CE6;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }
        input[type="number"], input[type="text"], textarea, select {
          width: 100%;
          width: -webkit-fill-available
          padding: 0.5rem;
          border-radius: 6px;
          border: 1px solid #ffffff;
          background-color: #1c1c1e;
          color: #ffffff;
          font-size: 1rem;
          height:30px
        }
        .file-input-label {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          background-color: #2c2c2e;
          color: #ffffff;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .file-input-label:hover {
          background-color: #3a3a3c;
        }
        .file-input {
          display: none;
        }
        button {
          width: 100%;
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          background-color: #5E5CE6;
          color: #ffffff;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #4b4acf;
        }
        .quiz-text-area{
          height:100px
        }
      `}</style>
    </div>
  );
}
