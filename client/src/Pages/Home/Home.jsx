import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Style/Home.css";
import CardList from "../../Component/CardList";
import { Link } from "react-router-dom";
import Banner from "../../Component/Banner";
import Modal from "react-modal";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5001/products");
    setProducts(response.data.products);
  };

  return (
    <div className="home-top">
      <Banner />
      <div className="home-inner-top">
        <div className="card-list">
          {products ? (
            <>
              {products.map((product) => (
                <Link to={`/product/${product._id}`}>
                  <CardList product={product} />
                </Link>
              ))}
            </>
          ) : (
            <>Loading Products</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
