import express from 'express';
import mongoose from 'mongoose';
import CourseModel from '../Models/Course.js';
import { sendMessageToClients } from '../Websockets/websocket.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newCourse = new CourseModel({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            categories: []
        });

        const savedCourse = await newCourse.save();
        console.log("Succesfully saved course: ", savedCourse);
        sendMessageToClients();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const courses = await CourseModel.find()
            .populate({
                path: "categories",
                populate: [{
                    path: "subcategories"
                }]
            });

        res.status(201).json(courses)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', getCourse, async (req, res) => {
    res.json(res.course);
});

router.delete('/:id', getCourse, async(req, res) => {
    try {
        await res.course.deleteOne();
        sendMessageToClients();
        res.json({message: "Course succesfully deleted"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.patch('/:id', getCourse, async (req, res) => {
    if (req.body.title != null) {
        res.course.title = req.body.title;
    }
    if (req.body.categories != null) {
        res.course.categories = req.body.categories;
    }

    try {
        const updatedCourse = await res.course.save();
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

async function getCourse(req, res, next) {
    let course;
    try {
        course = await CourseModel.findById(req.params.id)
        .populate({
            path: "categories",
            populate: [{
                path: "subcategories"
            }]
        });

        if (course == null) {
            return res.status(404).json({message: "Course not found"});
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message});
    }

    res.course = course;
    next();
}

export default router;