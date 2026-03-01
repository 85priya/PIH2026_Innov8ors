// backend/server.js
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());



// MongoDB connection
const uri = "mongodb+srv://Mess_Admin:Mess@inno8tor_5@cluster0.u84fvqy.mongodb.net/?appName=Cluster0";
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});