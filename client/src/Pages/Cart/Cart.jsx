import React, { useEffect, useState } from "react";
import "../../Style/Cart.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeItemFromCart = async (productId) => {
    try {
      // Send a request to the API to remove the item
      console.log(productId);
      await axios.post("http://localhost:5001/toggleCart", {
        productId,
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  useEffect(() => {
    getCartItems();
  }, [removeItemFromCart]);

  const getCartItems = async () => {
    const response = await axios.get("http://localhost:5001/cart");
    setCartItems(response.data.products);
  };

  function totalBill() {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.sellingRate;
    });
    return total.toFixed(2);
  }

  function totalDiscount() {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.originalRate - item.sellingRate;
    });

    return total.toFixed(2);
  }

  return (
    <div className="cart-top">
      <div className="cart-inner-top">
        <div className="cart-item">
          {cartItems ? (
            <>
              {cartItems.map((item) => (
                <div className="cart-item-inner" key={item.productId}>
                  <div className="cart-item-img">
                    <Link to={`/product/${item._id}`}>
                      <img src={item.imageURL} alt="" />
                    </Link>
                  </div>
                  <div className="cart-item-desc">
                    <div className="cart-item-title">{item.productName}</div>
                    <div className="cart-item-price">
                      <div className="cart-item-selling">
                        ${item.sellingRate}
                      </div>
                    </div>
                    <div className="cart-item-rating">
                      Rating: {item.rating} / 5
                    </div>
                    <div className="cart-item-quantity">
                      <button onClick={() => removeItemFromCart(item._id)}>
                        Remove Item
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div style={{ backgroundColor: "black" }}>Loading...</div>
          )}
        </div>
        <div className="cart-right-billing">
          <div className="cart-bill">
            <div className="cart-bill-inner">
              <div className="cart-bill-head"> Product Detail</div>
              <div className="cart-bill-total">
                Total Bill : $ {totalBill() + totalDiscount()}
              </div>
              <div className="cart-bill-discount">
                {" "}
                Total Discount :
                <span style={{ color: "green" }}> $ {totalDiscount()}</span>
              </div>
              <div className="cart-bill-mode"> Delivery Charge : $0 </div>
              <div className="cart-bill-pay">
                {" "}
                Total Payable : $ {totalBill()}{" "}
              </div>
            </div>
          </div>
          <Link to={"/checkout"}>
            {" "}
            <div className="place-order">Checkout</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
