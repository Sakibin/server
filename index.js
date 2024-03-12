const express = require("express");
const { ndown } = require("nayan-media-downloader");
const { bing } = require("nayan-bing-api");
//const app = express();

const app = express();
const PORT = 3000;

async function downloadMedia(url) {
    const URL = await ndown(url);
    return URL;
}

app.get("/facebook", async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res.status(400).send("URL parameter is required");
        }

        const URL = await downloadMedia(url);
        res.send(URL);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/tiktok", async (req, res) => {
    try {
        const url = req.query.url;
        if (!url) {
            return res.status(400).send("URL parameter is required");
        }

        const URL = await download(url);
        res.send(URL);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
const key = "Nayan"; // Don't change the key
const cookie = "1xVajW4TcH7QEANKuVux2InMywMqi5-ZhEoyOdKvptzdo8ItdzhO2rWiDugXiyvMHvqhOoths1n036I4WImxYCBG5ImyFn7Sy9iTW742Oqz9uKylci2Nk1pTDaCPfjGEGayzC-GjdYuHeGWaumqN5FKbyMCsvkeqM1TJmTPoT1RgUI1pX9rN6QdPo5kLoye3L08zQh2WFEdFtrMN33GKOMA"; // Paste your bing cookie here

// Define the route
app.get('/bing', async (req, res) => {
    const prompt = req.query.prompt || "cat"; // Use the prompt from the query parameter or default to "cat"

    try {
        const data = await bing(prompt, cookie, key);
        res.json(data); // Send the data as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); // Handle errors
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});