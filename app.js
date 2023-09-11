const express = require('express')
const app = express()

const Twitter = require('twitter')

const twitterConfig = {
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
}

const twitterClient = new Twitter(twitterConfig)

app.use(express.json()) // Add this middleware to parse JSON requests

app.post('/tweet', async (req, res) => {
    const tweetContent = req.body.content;
    twitterClient.post('/statuses/update', { status: tweetContent }, (error, tweet) => {
        if (!error) {
            console.log(tweet);
            res.status(200).json({ message: "Tweet posted successfully" });
        } else {
            console.error(error); // Changed from console.log to console.error for error messages
            res.status(500).json({ error: "Failed to send the tweet" });
        }
    });
});

app.listen(3000, () => {
    console.log("This server is running on port 3000");
});
