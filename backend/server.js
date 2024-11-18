const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

const surveySchema = new mongoose.Schema({
    questionId: String,
    answer: String,
    sessionId: String,
    completed: { type: Boolean, default: false }
});

const SurveyResponse = mongoose.model('SurveyResponse', surveySchema);


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.post('/api/survey', async (req, res) => {
    const { questionId, answer, sessionId } = req.body;
    const response = new SurveyResponse({ questionId, answer, sessionId });
    await response.save();
    res.json({ message: 'Response saved' });
});

app.post('/api/survey/complete', async (req, res) => {
    const { sessionId } = req.body;
    await SurveyResponse.updateMany({ sessionId }, { completed: true });
    res.json({ message: 'Survey completed' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});