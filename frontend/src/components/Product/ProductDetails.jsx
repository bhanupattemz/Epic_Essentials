import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getProductDetails } from "../../actions/ProductAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import Carousel from 'react-material-ui-carousel'
import "./ProductDetails.css"
import StarRatings from 'react-star-ratings';
import Review from "./Review"
import { clearErrors } from "../../reducers/productReducer/productDetailsReducer"



export default function ProductDetails() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const [quantity, setquantity] = useState(1)
    useEffect(() => {
        if (error) {
            alert.error(error);
            return;
        }
        dispatch(getProductDetails(id));
    }, [dispatch, error, id, alert]);

    if (loading) {
        return <Loader />;
    }

    return (
        <Fragment >
            <MetaData title={`${product.name}-Epic Essentials`} />
            <section className="product-card">
                <section className="productDetails">
                    <div className="Carousel">
                        <Carousel >
                            {product.images && product.images.map((item, i) => {
                                return <img className="CarouselImage" src={item.url} alt={`${i}`} key={item.url} />
                            })}
                        </Carousel>
                    </div>
                    <div className="details">
                        <div className="details-name">
                            <h3>{product.name}</h3>
                            <p>id:  {product._id}</p>
                        </div>
                        <div className="details-rating">
                            <StarRatings
                                rating={product.rating}
                                starDimension="20px"
                                starRatedColor="gold"
                                starSpacing="0px" />
                            <span> ({product.review ? product.review.length : "0"} reviews)</span>
                        </div>
                        <form className="details-quantity">
                            <p>₹{product.price}</p>
                            <button onClick={(e) => {
                                e.preventDefault()
                                setquantity((quantity) => quantity < 2 ? quantity : quantity - 1)
                            }}>-</button>
                            <input type="text" value={quantity} id="quantity" />
                            <button onClick={(e) => {
                                e.preventDefault()
                                setquantity((quantity) => quantity >= 10 ? quantity : quantity + 1)
                            }}>+</button>
                            <button>Add to cart</button>
                        </form>
                        <div className="details-stock">
                            <p >status:<b style={{ color: product.stock > 0 ? "green" : "red" }}>{product.stock > 0 ? "Instock" : "Out of Stock"}</b></p>
                        </div>
                        <div>
                            <h4>Discription:</h4>
                            <p>{product.discription}</p>
                        </div>

                    </div>
                </section>
            </section>

            <section className="reviews">
                <div className="reviews-heading">
                    <h3>Reviews</h3>
                </div>

                <div className="allReviews">
                    {product.review ? product.review.map((item) => {
                        return <Review key={item._id} review={item} />
                    }) : <h4>No Reviews</h4>}
                </div>
            </section>

        </Fragment>
    );
}
