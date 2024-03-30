import express from 'express';
import mongoose from 'mongoose';
import SubCategoryModel from '../Models/SubCategory.js';
import { sendMessageToClients } from '../Websockets/websocket.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newSubCategory= new SubCategoryModel({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title
        });

        const savedSubCategory= await newSubCategory.save();
        console.log("Succesfully saved subcategory: ", savedSubCategory);
        sendMessageToClients();
        res.status(201).json(savedSubCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const subCategories = await SubCategoryModel.find();
        res.status(201).json(subCategories);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', getSubCategory, async (req, res) => {
    res.json(res.subCategory);
});

router.delete('/:id', getSubCategory, async(req, res) => {
    try {
        await res.subCategory.deleteOne();
        sendMessageToClients();
        res.json({message: "SubCategory succesfully deleted"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.patch('/:id', getSubCategory, async (req, res) => {
    if (req.body.title != null) {
        res.subCategory.title = req.body.title;
    }
    if (req.body.code != null) {
        res.subCategory.code = req.body.code;
    }
    
    try {
        const updatedSubCategory= await res.subCategory.save();
        sendMessageToClients();
        res.json(updatedSubCategory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

async function getSubCategory(req, res, next) {
    let subCategory;
    try {
        subCategory = await SubCategoryModel.findById(req.params.id);

        if (subCategory == null) {
            return res.status(404).json({message: "Subcategory not found"});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }

    res.subCategory = subCategory;
    next();
}

export default router;