import React from "react";
import "../Style/Cardlist.css";

const CardList = (props) => {
  const data = props.product;

  // Calculate discount percentage
  const discountPercentage =
    ((data.originalRate - data.sellingRate) / data.originalRate) * 100;

  return (
    <div className="card-top">
      <div className="card-inner-top">
        <div className="prod-img">
          <img src={data.imageURL} alt={data.productName} />
        </div>
        <div className="prod-title">{data.productName}</div>
        {/* <div className="prod-desc">{data.description}</div> */}
        <div className="prod-rates">
          <div className="original-rate">
            {" "}
            <s> ${data.originalRate} </s>
          </div>
          <div className="selling-rate">${data.sellingRate}</div>
          <div className="discount">
            {discountPercentage.toFixed(0)}% Discount
          </div>
        </div>
        <div className="prod-rating">Rating: {data.rating}</div>
      </div>
    </div>
  );
};

export default CardList;
