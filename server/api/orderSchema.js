const mongoose = require('mongoose');

// Define order schema
const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
    },
    items: [
        {
            productId: {
                type: String,
                required: true,
            }
            // quantity: {
            //     type: String,
            //     required: true,
            // },
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Create Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
