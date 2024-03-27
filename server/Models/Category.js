import mongoose from 'mongoose';
import SubCategoryModel from './SubCategory.js';

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
        ref: 'SubCategory'
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

// Mongoose middleware to remove associated categories when a category is deleted
categorySchema.pre('deleteOne', { document: false, query: true }, async function (next) {
    try {
        // Extract the _id of the category being deleted from the filter
        const categoryId = this.getFilter()._id;

        // Retrieve the category document being deleted
        const category = await this.model.findOne({ _id: categoryId });
        
        // Remove all categories associated with the category
        await SubCategoryModel.deleteMany({ _id: { $in: category.subcategories } });

        next();
    } catch (error) {
        next(error);
    }
});

// Mongoose middleware to remove associated subcategories when multiple categories are deleted
categorySchema.pre('deleteMany', { document: false, query: true }, async function (next) {
    try {
        console.log('deleteing many')
        // Retrieve the filter for the deleteMany operation
        const filter = this.getFilter();

        // Find all categories that match the filter
        const categories = await this.model.find(filter);

        // Remove all subcategories associated with the categories
        const subcategoryIds = categories.flatMap(category => category.subcategories);
        await SubCategoryModel.deleteMany({ _id: { $in: subcategoryIds } });

        next();
    } catch (error) {
        next(error);
    }
});


const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel;