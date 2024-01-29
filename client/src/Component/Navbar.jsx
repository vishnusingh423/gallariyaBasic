import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Navbar.css";

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClick = () => {
    if (searchInput.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <div className="nav-top">
      <div className="nav-head">ShopHub</div>
      <div className="nav-list">
        <Link to={"/"}>
          <div className="nav-items">Home</div>
        </Link>
        <Link to={"/addProduct"}>
          <div className="nav-items">Add Product</div>
        </Link>
        <Link to={"/cart"}>
          <div className="nav-items">Cart</div>
        </Link>
        <div className="search-input">
          <input
            type="text"
            name="search"
            placeholder="Search Products"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearchButtonClick}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
