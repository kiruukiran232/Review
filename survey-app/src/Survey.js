import React, { useState } from 'react';
import axios from 'axios';
import './Survey.css';

const questions = [
  { id: '1', text: 'How satisfied are you with our products?', type: 'rating', scale: 5 },
  { id: '2', text: 'How fair are the prices compared to similar retailers?', type: 'rating', scale: 5 },
  { id: '3', text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', scale: 5 },
  { id: '4', text: 'On a scale of 1-10 how would you recommend us to your friends and family?', type: 'rating', scale: 10 },
  { id: '5', text: 'What could we do to improve our service?', type: 'text' }
];

const Survey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId] = useState(Date.now().toString());

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: e.target.value });
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await axios.post('http://localhost:5000/api/survey/complete', { sessionId });
      alert('Thank you for completing the survey!');
    }
  };

  const handleSubmit = async () => {
    for (const [questionId, answer] of Object.entries(answers)) {
      await axios.post('http://localhost:5000/api/survey', { questionId, answer, sessionId });
    }
    alert('Survey responses submitted!');
    setCurrentQuestion(0);
    setAnswers({});
  };

  return (
    <div className="survey-container">
      <h2 className="survey-title">Customer Survey</h2>
      <div className="survey-progress">
        <span>{currentQuestion + 1} / {questions.length}</span>
      </div>
      <p className="survey-question">{questions[currentQuestion].text}</p>
      {questions[currentQuestion].type === 'rating' ? (
        <input
          key={currentQuestion} 
          type="number"
          min="1"
          max={questions[currentQuestion].scale}
          className="survey-input"
          value={answers[questions[currentQuestion].id] || ''}
          onChange={handleAnswerChange}
        />
      ) : (
        <textarea
          key={currentQuestion} 
          className="survey-textarea"
          rows="4"
          value={answers[questions[currentQuestion].id] || ''}
          onChange={handleAnswerChange}
        ></textarea>
      )}
      <div className="survey-navigation">
        <button
          className="survey-button prev"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        {currentQuestion !== questions.length - 1 && (
  <button
    className="survey-button next"
    onClick={handleNext}
  >
    Next
  </button>
)}
      </div>
      {currentQuestion === questions.length - 1 && (
        <button className="survey-button submit" onClick={handleSubmit}>Confirm Submission</button>
      )}
    </div>
  );
};

export default Survey;
