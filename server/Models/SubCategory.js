import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        primaryKey: true
    },
    title: {
        type: String,
        required: true
    },
    example: {
        type: String,
        required: true
    },
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

const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);

export default SubCategoryModel;