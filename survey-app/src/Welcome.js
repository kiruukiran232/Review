import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();

    const startSurvey = () => {
        navigate('/survey');
    };

    return (
        <div className="welcome-container">
            <h1 className="welcome-title">Welcome to Our Survey!</h1>
            <p className="welcome-subtitle">
                Your feedback helps us improve and provide you with the best experience possible. 
            </p>
            <button className="welcome-button" onClick={startSurvey}>
                Start Survey
            </button>
        </div>
    );
};

export default Welcome;
