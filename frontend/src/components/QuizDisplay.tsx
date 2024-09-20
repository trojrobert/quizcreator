import React from 'react';
import { Card, CardContent, CardHeader, Button, Typography } from '@mui/material';

export default function QuizDisplay({ quiz }) {
  if (!quiz) {
    return (
      <div className="flex justify-center items-center h-full italic text-gray-500">
        Generated quiz will be seen here!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {quiz.map((question, index) => (
        <Card key={index} sx={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
          <CardHeader
            sx={{ backgroundColor: '#1A73E8', color: '#fff', padding: '16px' }}
            title={`Question ${index + 1}`}
            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
          />
          <CardContent sx={{ padding: '16px' }}>
            <Typography variant="body1" gutterBottom>
              {question.question}
            </Typography>
            <div style={{ marginBottom: '16px' }}>
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    backgroundColor: option === question.correct_answer ? '#28a745' : '#333',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{option}</span>
                  {option === question.correct_answer && (
                    <span style={{ marginLeft: 'auto', color: '#fff' }}>✓</span>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary">
                Explain
              </Button>
              <Button variant="contained" color="success">
                Submitted
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}