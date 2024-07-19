import React from "react";
import StarRatings from 'react-star-ratings';
import "./Home.css"
import MetaData from "../MetaData";

export default function Product({ prod }) {
    return (

        <a href={`/products/${prod._id}`} style={{ textDecoration: "none" }} key={prod._id}>
            <div className="productCard">
                <img src={prod.images[0].url} alt={`${prod.name}-img`} />
                <div>
                    <h3>{prod.name}</h3>
                    <StarRatings
                        rating={prod.rating}
                        starDimension="20px"
                        starRatedColor="gold"
                        starSpacing="0px" /><span>{prod.review.length}</span>
                    <p>Price: ${prod.price}</p>
                </div>

            </div>
        </a>
    );
}
