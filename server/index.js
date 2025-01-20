import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";

const corsOptions = {
    origin: 'https://location-tracker-hh7v.vercel.app', // Frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
};

const app = express();
configDotenv();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error while connecting DataBase ${error}`);
    }
};

connectDB();
app.use(cors(corsOptions)); // CORS middleware
app.use(express.json()); // JSON middleware

// Add manual CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://location-tracker-hh7v.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Schema to store location data
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

// Route to handle incoming location data
app.post('/store-location', async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        const newLocation = new Location({ latitude, longitude });
        await newLocation.save();

        res.json({ message: 'Location stored successfully!' });
    } catch (error) {
        console.error('Error storing location:', error);
        res.status(500).json({ error: 'Error storing location data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
