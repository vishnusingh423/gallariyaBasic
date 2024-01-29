const Cart = require('../cartSchema');
const Order = require('../orderSchema'); // Adjust the path based on your project structure
const Product = require('../productSchema');
const { calculateTotalAmount, updateProductQuantities, generateOrderId } = require('./productFunc');


exports.checkout = async (req, res) => {
    try {
        const { user, address, items } = req.body;
        const totalAmount = await calculateTotalAmount(items);

        const order = new Order({
            orderId: generateOrderId(items),
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            totalAmount,
            customerName: user.name,
            shippingAddress: address,
        });

        await order.save();
        // // Save order to database

        // // Update product quantities
        await updateProductQuantities(items);

        // res.status(200).json({ message: order });
        res.status(200).json({ message: 'Order placed successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.products = async (req, res) => {

    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.searchProducts = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ error: 'Search query is required in the request body.' });
        }

        // Use a regular expression to perform a case-insensitive search on productName and description
        const searchResults = await Product.find({
            $or: [
                { productName: { $regex: id, $options: 'i' } },
                { description: { $regex: id, $options: 'i' } },
            ],
        });

        res.status(200).json({ success: true, results: searchResults });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.productDetail = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const data = await Product.findById(id);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.addToCart = async (req, res) => {
    const { productId } = req.body;

    try {
        // Check if the product is already in the cart
        const existingProduct = await Cart.findOne({ productId });

        if (existingProduct) {
            // If the product is in the cart, remove it
            await Cart.deleteOne({ productId });
            res.json({ message: 'Product removed from the cart' });
        } else {
            // If the product is not in the cart, add it
            const newProduct = new Cart({ productId });
            await newProduct.save();
            res.json({ message: 'Product added to the cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.cart = async (req, res) => {
    try {
        const cart = await Cart.find();
        const productIds = cart.map(product => product.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.clearCart = async (req, res) => {
    try {
        await Cart.deleteMany();
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.update = async (req, res) => {


}



exports.addItem = async (req, res) => {
    try {
        const {
            productName,
            description,
            originalRate,
            sellingRate,
            imageURL,
            quantity,
            rating
        } = req.body;

        const products = await Product.find();

        const id = products.length + 1;

        // Create a new product instance
        const newProduct = new Product({
            id,
            productName,
            description,
            originalRate,
            sellingRate,
            imageURL,
            quantity,
            rating,
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json({ success: true, product: savedProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
