// backend/server.js
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// MongoDB connection
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/messfinder?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client.db("messfinder").collection("messes");
    } catch (err) {
        console.error(err);
    }
}

// API to get all messes
app.get("/messes", async(req, res) => {
    try {
        const collection = await connectDB();
        const messes = await collection.find({}).toArray();
        res.json(messes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});