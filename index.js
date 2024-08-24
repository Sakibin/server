const express = require('express');
const { RsnChat } = require('rsnchat');

const app = express();
const port = 3000;

// Initialize RSNChat with your API key
const rsnchat = new RsnChat('rsnai_dc0AeSF1JUEOA8dPEOkupsKs');

// Express route to handle GPT-4 requests

app.get('/', (req, res) => res.send('Yahuuuuuuuu, Sakibin here broooo.'));

app.get('/gpt4', async (req, res) => {
    try {
        const userPrompt = req.query.prompt || 'Hello, what is your version?';
        const response = await rsnchat.gpt4(userPrompt);
        res.json({ message: response.message });
    } catch (error) {
        console.error('Error fetching GPT-4 response:', error);
        res.status(500).json({ error: 'Failed to fetch response from GPT-4' });
    }
});

app.get('/gpt3', async (req, res) => {
    try {
        const userPrompt = req.query.prompt || 'Hello, what is your version?';
        const response = await rsnchat.gpt(userPrompt);
        res.json({ message: response.message });
    } catch (error) {
        console.error('Error fetching GPT-3 response:', error);
        res.status(500).json({ error: 'Failed to fetch response from GPT-3' });
    }
});

app.get('/gemini', async (req, res) => {
    try {
        const userPrompt = req.query.prompt || 'Hello, what is your version?';
        const response = await rsnchat.gemini(userPrompt);
        res.json({ message: response.message });
    } catch (error) {
        console.error('Error fetching gemini response:', error);
        res.status(500).json({ error: 'Failed to fetch response from gemini' });
    }
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
