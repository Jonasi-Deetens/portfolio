import express from 'express';
import mongoose from 'mongoose';
import CategoryModel from '../Models/Category.js';
import { sendMessageToClients } from '../Websockets/websocket.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newCategory= new CategoryModel({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            subcategories: []
        });

        const savedCategory= await newCategory.save();
        console.log("Succesfully saved category: ", savedCategory);
        sendMessageToClients();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const categories = await CategoryModel.find()
            .populate('subcategories');

        res.status(201).json(categories)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', getCategory, async (req, res) => {
    res.json(res.category);
});

router.delete('/:id', getCategory, async(req, res) => {
    try {
        await res.category.deleteOne();
        sendMessageToClients();
        res.json({message: "Category succesfully deleted"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.patch('/:id', getCategory, async (req, res) => {
    if (req.body.title != null) {
        res.category.title = req.body.title;
    }
    if (req.body.subcategories != null) {
        res.category.subcategories = req.body.subcategories;
    }

    try {
        const updatedCategory= await res.category.save();
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

async function getCategory(req, res, next) {
    let category;
    try {
        category= await CategoryModel.findById(req.params.id)
        .populate('subcategories');

        if (category == null) {
            return res.status(404).json({message: "Category not found"});
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message});
    }

    res.category = category;
    next();
}

export default router;