import express from 'express';
import mongoose from 'mongoose';
import UserModel from '../Models/User.js';
import { comparePassword, hashPassword } from '../Encryption/bcrypt.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newUser= new UserModel({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            password: await hashPassword(req.body.password)
        });

        const savedUser= await newUser.save();
        console.log("Succesfully saved course: ", savedUser);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post('/login', validateLoginData, async (req, res) => {
    if (res.user) {
        const token = jwt.sign({userId: res.user._id}, process.env.JWT_KEY, {expiresIn: '1h'});
        return res.status(201).json({username: res.user.username, token})
    }
});

async function validateLoginData(req, res, next) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'All field are required'})
    }

    try {
        const user = await UserModel.findOne({username: username});
        console.log(user)
        if (!user) return res.status(400).json({message: 'Username does not exist'});

        const correctPassword = await comparePassword(password, user.password);
        if (!correctPassword) return res.status(400).json({message: 'Incorrect password'});
        else res.user = user;

    } catch (error) {
        res.status(500).json({message: error.message});
    }

    next();
}

export default router;