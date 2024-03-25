import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        primaryKey: true
    },
    title: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const CourseModel = mongoose.model('Course', courseSchema);

export default CourseModel;