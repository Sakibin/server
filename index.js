const express = require('express');
const { RsnChat } = require('rsnchat');
const { alldown } = require('nayan-media-downloader');
const { ephoto } = require('nayan-server');
const axios = require('axios');
const qs = require('qs');
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

app.get('/ephoto', async (req, res) => {
    const { number, text } = req.query;

    if (!number || !text) {
        return res.status(400).send('Missing url or text parameter');
    }

    if (!req.query.text) return 
    if (!req.query.number) return 
    if (req.query.number == "1"){ var url = "https://en.ephoto360.com/create-a-cloud-text-effect-in-the-sky-618.html"}
    if (req.query.number == "2"){ var url = "https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html"}
    if (req.query.number == "3"){ var url = "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html"}
    if (req.query.number == "4"){ var url = "https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html"}
    if (req.query.number == "5"){ var url = "https://en.ephoto360.com/write-text-on-wet-glass-online-589.html"}
    if (req.query.number == "6"){ var url = "https://en.ephoto360.com/write-in-sand-summer-beach-online-576.html"}
    if (req.query.number == "7"){ var url = "https://en.ephoto360.com/green-neon-text-effect-395.html"}
    if (req.query.number == "8"){ var url = "https://en.ephoto360.com/text-firework-effect-356.html"}
    if (req.query.number == "9"){ var url = "https://en.ephoto360.com/online-hot-metallic-effect-341.html"}
    if (req.query.number == "10"){ var url = "https://en.ephoto360.com/paint-splatter-text-effect-72.html"}
    try {
        // Generate the image using ephoto
        const response = await ephoto(url, [text]);

        if (response.status && response.url) {
            // Fetch the image data from the generated URL
            const imageResponse = await axios.get(response.url, { responseType: 'arraybuffer' });

            // Set the correct content-type and send the image
            res.set('Content-Type', 'image/png');
            res.send(imageResponse.data);
        } else {
            res.status(500).send('Failed to generate image');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.get('/get', async (req, res) => {
  try {
    const response = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
    const getemail = response.data[0];
    res.json({ email: getemail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Err: 500' });
  }
});

app.get('/inbox/:email', async (req, res) => {
  try {
    const divide = req.params.email.split('@');
    const name = divide[0];
    const domain = divide[1];
    const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${name}&domain=${domain}`); 
    const messages = response.data;
    const mainmsg = [];
    for (const message of messages) {
      const msgId = message.id;
      const sendmsg = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${name}&domain=${domain}&id=${msgId}`);   
      const sendmessage = {
        from: sendmsg.data.from,
        subject: sendmsg.data.subject,
        body: sendmsg.data.textBody,
        date: sendmsg.data.date
      };
      mainmsg.push(sendmessage);
    }
    res.json(mainmsg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Err: 500' });
  }
});

app.get('/alldl', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('Please provide a URL as a query parameter.');
    }

    try {
        const data = await alldown(url);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error processing the request');
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
