import React, { useEffect, useState } from "react";
import "../../Style/Home.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CardList from "../../Component/CardList";

const Search = () => {
  const { id } = useParams();
  console.log(id);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Call getProducts when the component mounts
    getProducts();
  }, [id]); // Add an empty dependency array to run only once when mounted

  const getProducts = async () => {
    try {
      // Make the API request with the searchQuery as a query parameter
      const response = await axios.get("http://localhost:5001/search/" + id);
      console.log(response);
      setProducts(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div
      style={{
        height: "max-content",
        minHeight: "80vh",
        marginBlockEnd: "2rem",
      }}
    >
      <div
        className="search-head"
        style={{ padding: "1rem", fontSize: "1.4rem" }}
      >
        Search Result For <i>'' {id} ''</i>
      </div>
      <div className="card-list">
        {products ? (
          <>
            {products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <CardList product={product} />
              </Link>
            ))}
          </>
        ) : (
          <>Loading Products</>
        )}
      </div>
    </div>
  );
};

export default Search;
