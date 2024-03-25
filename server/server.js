import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const app = express();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3050;

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log("Welcome, " + HOST + ". You are connected on port: " + PORT);
})