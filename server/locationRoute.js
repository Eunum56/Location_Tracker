import express from "express"
import mongoose from "mongoose";


const Routes = express.Router();

// Schema to store location data
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

Routes.post("/location", async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        const newLocation = new Location({ latitude, longitude });
        await newLocation.save();

        res.json({ message: 'Location stored successfully!' });
    } catch (error) {
        console.error('Error storing location:', error);
        res.status(500).json({ error: 'Error storing location data' });
    }
})

export default Routes;