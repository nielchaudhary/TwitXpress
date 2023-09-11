const express = require('express')
const app = express()

const Twitter = require('twitter')

const twitterConfig = {
    consumer_key: 'OgoVTVbdMb7vkaR6wSebpIgtW', //ADD YOUR CONSUMER KEY 
    consumer_secret: 'J7DTf9E2TYLuua4W6DFYzsZ2RouBfkUC1p36xCgZ7K3WEZOgVV', //ADD YOUR CONSUMER SECRET
    access_token_key: '1680823888069132291-TFgEXNEsFNPDyGYJGagYPJooYHi4Qv', //ADD YOUR ACCESS TOKEN
    access_token_secret: 'IyVT0F8tkxRKUQmkBp0VMk3KQ64hhWtFD9mpi4NqAnxSE'  // ADD YOUR ACCESS SECRET
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

// Add a new route to get a tweet by its ID
app.get('/tweet/:tweetId', async (req, res) => {
    const tweetId = req.params.tweetId;

    // Use the Twitter API to get the tweet by its ID
    twitterClient.get('/statuses/show', { id: tweetId }, (error, tweet) => {
        if (!error) {
            console.log(tweet);
            res.status(200).json({ tweet });
        } else {
            console.error(error);
            res.status(500).json({ error: "Failed to retrieve the tweet" });
        }
    });
});

app.listen(3000, () => {
    console.log("This server is running on port 3000");
});
