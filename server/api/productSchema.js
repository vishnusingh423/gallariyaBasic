const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    originalRate: {
        type: Number,
        required: true,
    },
    sellingRate: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
