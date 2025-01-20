import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: ['POST'],
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
app.use(cors(corsOptions));
app.use(express.json());

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

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
