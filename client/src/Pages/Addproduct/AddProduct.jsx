import React, { useState } from "react";
import axios from "axios";
import "../../Style/AddProd.css";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    originalRate: 0,
    sellingRate: 0,
    imageURL: "",
    quantity: 0,
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(productData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !productData.productName ||
      !productData.description ||
      !productData.originalRate ||
      !productData.sellingRate ||
      !productData.imageURL ||
      !productData.quantity ||
      !productData.rating
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Make a POST request to your API endpoint for adding a new product
      await axios.post("http://localhost:5001/addItem", productData);
      window.location.href = "./addsuccess";
      // Optionally, you can handle success or redirect to a success page
      console.log("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-div">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label>Description:</label>
          <input
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label>Original Rate:</label>
          <input
            type="number"
            name="originalRate"
            value={productData.originalRate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label>Selling Rate:</label>
          <input
            type="number"
            name="sellingRate"
            value={productData.sellingRate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label>Image URL:</label>
          <input
            type="url"
            name="imageURL"
            value={productData.imageURL}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-div">
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
