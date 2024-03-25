import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        primaryKey: true
    },
    title: {
        type: String,
        required: true
    },
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory'
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

const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;