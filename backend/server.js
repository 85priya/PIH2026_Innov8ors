// backend/server.js

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ PORT for Render deployment
const PORT = process.env.PORT || 3000;

// ✅ MongoDB connection URI
const uri = "mongodb+srv://Mess_Admin:Mess@inno8tor_5@cluster0.u84fvqy.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

let collection;

// ✅ Connect to MongoDB only once
async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");
        collection = client.db("messfinder").collection("messes");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
    }
}

// ✅ Home route (important for Render root URL)
app.get("/", (req, res) => {
    res.send("MessFinder Backend is Running 🚀");
});

// ✅ API to get all messes
app.get("/messes", async(req, res) => {
    try {
        const messes = await collection.find({}).toArray();
        res.json(messes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// ✅ Start server after DB connects
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    });
});