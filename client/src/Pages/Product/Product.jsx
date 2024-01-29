import React, { useEffect, useState } from "react";
import "../../Style/Product.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [cart, setCart] = useState([]);
  // const [toggled, setToggled] = useState(0);

  const toggleCart = async (productId) => {
    try {
      await axios.post("http://localhost:5001/toggleCart", {
        productId,
      });
    } catch (error) {
      console.error("Error toggling cart item:", error);
    }
  };

  const getProduct = async () => {
    const response = await axios.get(
      "http://localhost:5001/productDetail/" + id
    );
    setProduct(response.data.data);
    // console.log(response.data.data);
  };

  const showCart = async () => {
    const data = await axios.get("http://localhost:5001/cart");
    // console.log(data.data.products);
    setCart(data.data.products);
  };

  useEffect(() => {
    getProduct();
    showCart();
  }, []);

  //   const discountPercentage =

  return (
    <div className="product-top">
      {product ? (
        <>
          <div className="product-inner-top">
            <div className="product-inner-left">
              <div className="product-img">
                <img src={product.imageURL} alt="" srcset="" />
              </div>
            </div>
            <div className="product-inner-right">
              <div className="product-title">{product.productName}</div>
              <div className="product-desc">{product.description}</div>
              <div
                className="product-price"
                style={{ display: "flex", gap: "2rem" }}
              >
                <div className="product-original">$ {product.originalRate}</div>
                <div className="product-selling">$ {product.sellingRate}</div>
                <div className="product-discount">
                  {(
                    ((product.originalRate - product.sellingRate) /
                      product.originalRate) *
                    100
                  ).toFixed(0)}
                  % Discount
                </div>
              </div>
              <div className="product-rating">Rating: {product.rating} / 5</div>
              <div className="product-rating">
                {product.quantity} items in stock , Hurry !
              </div>
              <Link to="/cart">
                <div className="product-cart">
                  {cart.find((item) => item._id === product._id) ? (
                    <button onClick={() => toggleCart(product._id)}>
                      Remove From Cart
                    </button>
                  ) : (
                    <button onClick={() => toggleCart(product._id)}>
                      Add To Cart
                    </button>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="loading" style={{ height: "80vh" }}>
          Loading . .. . .{" "}
        </div>
      )}
    </div>
  );
};

export default Product;
