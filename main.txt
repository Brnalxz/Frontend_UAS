require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

// Load environment variables
const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// MongoDB Client setup
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Express setup
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));

// MongoDB connection
let forumCollection;

async function connectDB() {
    try {
        await client.connect();
        const db = client.db('forumDB');
        forumCollection = db.collection('posts');
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
}

connectDB();

// API Endpoints
app.get('/posts', async (req, res) => {
    try {
        const posts = await forumCollection.find({}).toArray();
        res.json(posts);
    } catch (err) {
        res.status(500).send("Error fetching posts: " + err.message);
    }
});

app.post('/posts', async (req, res) => {
    try {
        const newPost = {
            username: 'defaultUser',
            title: req.body.title,
            description: req.body.description,
            likes: 0,
            dislikes: 0,
            comments: 0,
            image: req.body.image || null,
        };
        const result = await forumCollection.insertOne(newPost);
        res.json(result);
    } catch (err) {
        res.status(500).send("Error adding post: " + err.message);
    }
});

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await forumCollection.deleteOne({ _id: new MongoClient.ObjectId(id) });
        res.json(result);
    } catch (err) {
        res.status(500).send("Error deleting post: " + err.message);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
