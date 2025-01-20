import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import path from "path";



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


app.use(cors()); // CORS middleware
app.use(express.json()); // JSON middleware

const dirname = path.resolve()


// Schema to store location data
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

// Route to handle incoming location data
app.post('/location', async (req, res) => {
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

app.use(express.static(path.join(dirname, "/frontend")))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "index.html"))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at ${PORT}`);
});
