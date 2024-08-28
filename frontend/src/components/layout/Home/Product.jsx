import React, { Fragment } from "react";
import StarRatings from 'react-star-ratings';
import "./Home.css"
import MetaData from "../MetaData";
import { useNavigate } from "react-router-dom"
export default function Product({ prod }) {
    const navigate = useNavigate()
    return (
        <Fragment>
            {prod.images && <div onClick={()=>navigate(`/products/${prod._id}`)}  style={{ textDecoration: "none" }} key={prod._id}>
                <div className="productCard">
                    <img src={prod.images[0]?.url} alt={`${prod.name}-img`} />
                    <div>
                        <h4>{prod.name}</h4>
                        <StarRatings
                            rating={prod.rating}
                            starDimension="20px"
                            starRatedColor="gold"
                            starSpacing="0px" /><span>{`(${prod.review.length})`}</span>
                        <p>Price: ₹{prod.price}</p>
                    </div>
                </div>
            </div>}
        </Fragment>

    );
}
