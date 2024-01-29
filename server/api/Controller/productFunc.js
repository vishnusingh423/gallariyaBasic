
const Product = require('../productSchema'); // Adjust the path based on your project structure
async function calculateTotalAmount(items) {
    let totalAmount = 0;

    for (const item of items) {
        console.log(item.productId);
        const product = await Product.findById(item.productId);
        totalAmount += product.sellingRate * 1;
        console.log(totalAmount);
    }

    return totalAmount;
}

async function updateProductQuantities(items) {
    for (const item of items) {
        const product = await Product.findById(item.productId);
        product.quantity -= 1;
        await product.save();
    }
}

function generateOrderId() {
    // Logic to generate a unique order ID
    return `ORD-${Date.now()}`;
}

module.exports = {
    calculateTotalAmount,
    updateProductQuantities,
    generateOrderId,
};