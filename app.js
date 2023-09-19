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

// Add a new route to get a user's tweets by their username
app.get('/user-tweets/:username', async (req, res) => {
    const username = req.params.username;

    // Use the Twitter API to get a user's tweets by their username
    twitterClient.get('/statuses/user_timeline', { screen_name: username, count: 10 }, (error, tweets) => {
        if (!error) {
            console.log(tweets);
            res.status(200).json({ tweets });
        } else {
            console.error(error);
            res.status(500).json({ error: "Failed to retrieve user's tweets" });
        }
    });
});

// Add a new route to search for tweets based on a query
app.get('/search-tweets/:query', async (req, res) => {
    const query = req.params.query;

    // Use the Twitter API to search for tweets
    twitterClient.get('/search/tweets', { q: query, count: 10 }, (error, tweets) => {
        if (!error) {
            console.log(tweets);
            res.status(200).json({ tweets });
        } else {
            console.error(error);
            res.status(500).json({ error: "Failed to search for tweets" });
        }
    });
});

// Add a new route to get user information by their Twitter username
app.get('/user-info/:username', async (req, res) => {
    const username = req.params.username;

    // Use the Twitter API to get user information by username
    twitterClient.get('/users/show', { screen_name: username }, (error, user) => {
        if (!error) {
            console.log(user);
            res.status(200).json({ user });
        } else {
            console.error(error);
            res.status(500).json({ error: "Failed to retrieve user information" });
        }
    });
});



app.listen(3000, () => {
    console.log("This server is running on port 3000");
});



app.listen(3000, () => {
    console.log("This server is running on port 3000");
});
