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
const cookies = ["1IRlgoKEzSo3vZ9zdt213jhcfS0jwbJnanp0QLq2gXC6fwgqLLIupsl4w_QHE5Znf1pOhJ57eBq3fEB8LskkhYbKoCeVLgkRGZ8InEQLuH-rlamehN_Z2rh4eV05oKOLsiHEqeaFB4WnfTYqavQvdn11yZqdiqkJEir5YbP-SCHsaR4nYXEuCwBlL0_fZXCANPFsQzDNPS9y8lqymIuAtLYVAOWOqwf5cZlnX8kuALHA", "1wWvu6_PD2zxb-S9vL1tES27U8-eGSo0S954C9MtNSAdYktZsy8pLtoo6uHC_ii61xQBYhWTTgKO2HziGxMs9ekY1wJUgcqRWuVJ_wXyvToX2a6jHOKlgBpTS5qny0Haom1iS2iKCFQ2c1L-Pez45IGzeM7O5aMCOekXRh8V_TfnlUBksJYPiugXiuR1GOCWrU60tVRAL_SRX873IwCYAHg"]; // Array of cookies

function getRandomCookie() {
    const randomIndex = Math.floor(Math.random() * cookies.length);
    return cookies[randomIndex];
}

const cookie = getRandomCookie();

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
