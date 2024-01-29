const mongoose = require('mongoose');

// Define cart schema
const cartSchema = new mongoose.Schema({

    productId: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Create Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
