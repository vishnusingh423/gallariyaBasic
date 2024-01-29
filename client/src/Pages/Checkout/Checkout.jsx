import axios from "axios";
import React, { useEffect, useState } from "react";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    mobileNumber: "",
  });

  const getCartItems = async () => {
    const response = await axios.get("http://localhost:5001/cart");
    setCartItems(response.data.products);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleConfirm = async () => {
    // Extract product IDs from cart items
    const productIds = cartItems.map((item) => ({ productId: item._id }));

    // Prepare payload
    const payload = {
      user: {
        name: deliveryDetails.name,
      },
      address: deliveryDetails.address,
      items: productIds,
    };
    // console.log(payload);

    try {
      // Send POST request to checkout endpoint
      const response = await axios
        .post("http://localhost:5001/checkout", payload)
        .then((res) => {
          console.log(res);
          window.location.href = "./success";
        });
      await axios.post("http://localhost:5001/clearCart");
      console.log(response.data); // You can handle the response as needed
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  function totalBill() {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.sellingRate;
    });
    return total.toFixed(2);
  }

  return (
    <div className="check-top" style={{ height: "80vh" }}>
      <div className="check-inner-top" style={{ padding: "2rem" }}>
        <div className="check-head">
          <h2>Checkout</h2>
          <div>Fill in the delivery details</div>
        </div>
        <div className="check-name" style={{ marginBlock: "1rem" }}>
          <input
            style={{ width: "40%", fontSize: "1rem", padding: "0.5rem 1rem" }}
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setDeliveryDetails({ ...deliveryDetails, name: e.target.value })
            }
          />
        </div>
        <div className="check-address" style={{ marginBlock: "1rem" }}>
          <input
            style={{ width: "80%", fontSize: "1rem", padding: "0.5rem 1rem" }}
            type="text"
            placeholder="Address"
            onChange={(e) =>
              setDeliveryDetails({
                ...deliveryDetails,
                address: e.target.value,
              })
            }
          />
        </div>
        <div className="check-phone" style={{ marginBlock: "1rem" }}>
          <input
            style={{ width: "20%", fontSize: "1rem", padding: "0.5rem 1rem" }}
            type="number"
            placeholder="Mobile Number"
            onChange={(e) =>
              setDeliveryDetails({
                ...deliveryDetails,
                mobileNumber: e.target.value,
              })
            }
          />
        </div>
        <div className="total-amount">
          Total Payable Amount : ${totalBill()}
        </div>
        <div className="total-amount" style={{ marginBlockStart: "1rem" }}>
          Cash On Delivery
        </div>
        <div className="check-confirm" style={{ marginBlock: "1rem" }}>
          <button
            style={{
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              color: "white",
              backgroundColor: "black",
              cursor: "pointer",
            }}
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
