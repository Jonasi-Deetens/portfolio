import mongoose from 'mongoose';
import CategoryModel from './Category.js';

const courseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        primaryKey: true
    },
    title: {
        type: String,
        required: true
    },
    language: {
        type: String,
        default: "javascript"
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

// Mongoose middleware to remove associated categories when a course is deleted
courseSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
    try {
        // Extract the _id of the course being deleted from the filter
        const courseId = this.getFilter()._id;

        // Retrieve the course document being deleted
        const course = await this.model.findOne({ _id: courseId });

        // Remove all categories associated with the course
        await CategoryModel.deleteMany({ _id: { $in: course.categories } });

        next();
    } catch (error) {
        next(error);
    }
});

const CourseModel = mongoose.model('Course', courseSchema);

export default CourseModel;