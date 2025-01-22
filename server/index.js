import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import path from "path";
import Routes from "./locationRoute.js";

const dirname = path.resolve()

const corsOption = {
    origin: ['https://youtube-video-six.vercel.app', "http://localhost:4000"],
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

app.use(express.static(path.join(dirname, "/frontend")))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "index.html"))
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at ${PORT}`);
});
