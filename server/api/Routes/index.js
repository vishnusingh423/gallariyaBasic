const router = require("express").Router();


const productController = require("../Controller/productApi");





router.post("/checkout", productController.checkout);
router.get("/products", productController.products);
router.get("/search/:id", productController.searchProducts);
router.get("/productDetail/:id", productController.productDetail);
router.post("/toggleCart", productController.addToCart);
router.get("/cart", productController.cart);
router.post("/clearCart", productController.clearCart);
router.post("/addItem", productController.addItem);




module.exports = router;