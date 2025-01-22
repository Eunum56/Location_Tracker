import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import Routes from "./locationRoute.js";


const corsOption = {
    origin: ['https://youtube-video-six.vercel.app', "http://127.0.0.1:5500/frontend/index.html"],
    methods: ['POST', "GET"],
    credentials: true
}

const app = express();
configDotenv();

app.use(express.json()); // JSON middleware
app.use(cors(corsOption)); // CORS middleware

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error while connecting DataBase ${error}`);
    }
};




// Route to handle incoming location data
app.use("/api", Routes)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at ${PORT}`);
});
