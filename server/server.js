import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectToDatabase from './Database/database.js';

dotenv.config();
const app = express();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3050;

connectToDatabase();

app.use(cors());
app.use(express.json());

import CourseRouter from './Routers/Course.js';
app.use('/api/courses', CourseRouter);

import CategoryRouter from './Routers/Category.js';
app.use('/api/categories', CategoryRouter);

import SubCategoryRouter from './Routers/SubCategory.js';
app.use('/api/subcategories', SubCategoryRouter);

import UserRouter from './Routers/User.js';
app.use('/auth/users', UserRouter);

app.listen(PORT, () => {
    console.log("Welcome, " + HOST + ". You are connected on port: " + PORT);
})