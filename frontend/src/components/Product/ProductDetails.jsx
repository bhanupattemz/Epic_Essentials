import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { getProductDetails } from "../../actions/ProductAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import StarRatings from 'react-star-ratings';
import Review from "./Review";
import { clearErrors } from "../../reducers/productReducer/productDetailsReducer";
import { clearErrors as reviewClearErrors } from "../../reducers/reviewReducer/ReviewReducer"
import { addCartProducts } from "../../actions/CartAction";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReactStars from "react-rating-stars-component";
import { createreview, getUserReview, updatereview } from "../../actions/ReviewAction";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SellIcon from '@mui/icons-material/Sell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { getProducts } from "../../actions/ProductAction"
import ProductBox from "../layout/Home/Product"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./ProductDetails.css";
export default function ProductDetails() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const { product, loading, error, success } = useSelector((state) => state.productDetails);
    const { products: similarProducts } = useSelector(state => state.products);
    const { user } = useSelector(state => state.user);
    const { review, error: reviewError } = useSelector(state => state.review);
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState(0);
    const navigate = useNavigate()
    const [isReviewChanged, setisReviewChanged] = useState(false)
    const [imgNo, setimgNO] = useState(0)
    const [specificationOpen, setSpecificationOpen] = useState(false)
    let recentProducts = JSON.parse(localStorage.getItem("recent") || '[]')
    if (recentProducts.length > 10) {
        recentProducts.pop()
    }
    recentProducts = recentProducts.filter((item) => item._id !== product._id && item._id)
    recentProducts.unshift(product)
    localStorage.setItem("recent", JSON.stringify(recentProducts))
    const handleClickOpen = () => {
        setRating(review ? review.rating : 0)
        setComment(review ? review.comment : "")
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const reviewSubmitHandler = (e) => {
        e.preventDefault();
        if (!user) {
            navigate("/loginsignup")
        }
        setOpen(false);
        if (review) {
            dispatch(updatereview({ rating, comment }, review._id));
            if (!reviewError) {
                alert.success("review Updated")
            }
        } else {
            console.log({ rating, comment })
            dispatch(createreview({ rating, comment }, id));
            if (!reviewError) {
                alert.success("Review submitted")
            }
        }
        setisReviewChanged(!isReviewChanged)
    };
    const cartSubmitHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCartProducts(id, quantity));
        alert.success("ADDED TO Cart")
        navigate("/cart")
    };
    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [review])
    useEffect(() => {
        if (user) {
            dispatch(getUserReview(id));
        }
    }, [user])
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (reviewError) {
            alert.error(reviewError);
            dispatch(reviewClearErrors());
        }
        dispatch(getProductDetails(id));
        dispatch(getProducts({ category: product.category }))
    }, [error, id, alert, isReviewChanged, reviewError, getProducts]);
    useEffect(()=>{
        dispatch(getProducts({ category: product.category }))
    },[getProducts,dispatch,product])
    const guaranteesItems = [
        { name: "7 days Replacement", img: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723919515/Epic%20Essentials/zuw561uskzkvcyvft3bj.png" },
        { name: "Fast Delivery", img: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723919626/Epic%20Essentials/jiecgpxa3uqhvh2klk0h.jpg" },
        { name: "1 year Warranty", img: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723919550/Epic%20Essentials/o3yt3qkwmxsbtwr0jl71.png" },
        { name: "Top Brand", img: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723919584/Epic%20Essentials/nmpyjy19jpwyp8cevtj3.png" },
        { name: "Epic Delivered", img: "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723919764/Epic%20Essentials/rys0dm0tganpnk5pbolo.svg" }
    ]
    if (loading) {
        return <Loader />;
    }

    return (
        <Fragment>
            <MetaData title={`${product.name} - Epic Essentials`} />
            {product?.images &&
                <main className="product-details-page-main">
                    <section className="productdetails-container">

                        <div className="productdetails-imgs">
                            <div className="productdetails-prev-imgs-container">
                                <div className="productdetails-imgs-left-btn"
                                    onClick={() => setimgNO(no => (no - 1 + product.images.length) % product.images.length)}>
                                    <KeyboardArrowLeftIcon />
                                </div>
                                <div className="productdetails-prev-imgs">
                                    {product.images && product.images.map((img, index) => {
                                        return (
                                            <div className="productdetails-prev-img-box"
                                                style={{ border: imgNo === index && "2px solid blue" }}
                                                onClick={() => setimgNO(index)}>
                                                <img className="productdetails-prev-img" src={img.url} alt={`${product.name}-img`} />
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="productdetails-imgs-right-btn" onClick={() => setimgNO(val => (val + 1) % product.images.length)}>
                                    <ChevronRightIcon />
                                </div>
                            </div>
                            <div className="productdetails-main-img-container">
                                <img className="productdetails-main-img" src={product.images[imgNo].url} alt={`${product.name}-img`} />
                            </div>
                        </div>
                        <div className="productdetails-details">
                            <h1>{product.name}</h1>
                            <div className="details-rating">
                                <StarRatings
                                    rating={product.rating}
                                    starDimension="20px"
                                    starRatedColor="gold"
                                    starSpacing="0px"
                                />
                                <span> ({product.review ? product.review.length : "0"} reviews)</span>
                            </div>
                            <div>

                                <p><span className="product-details-point-heading">Price: </span>INR ₹{product.price}</p>
                            </div>

                            <div className="details-stock">
                                <p><span className="product-details-point-heading">Status: </span><b style={{ color: product.stock > 0 ? "greenyellow" : "red" }}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</b></p>
                            </div>
                            <div className="product-details-available-offers">
                                <h4>Available offers</h4>
                                <p><SellIcon /><span className="product-details-point-heading">FreeShip: </span> Free Delivery of product over ₹1000</p>
                                <p><SellIcon /><span className="product-details-point-heading">Special Price: </span> Get extra 5% off on product above ₹10000</p>
                            </div>

                            <Dialog open={open} onClose={handleClose} >
                                <DialogTitle>Review</DialogTitle>
                                <DialogContent>
                                    <div>
                                        <label className="product-details-point-heading" htmlFor="rating">Rating:</label>
                                        <ReactStars
                                            count={5}
                                            onChange={(rating) => setRating(rating)}
                                            size={30}
                                            activeColor="#ffd700"
                                            isHalf={true}
                                            value={rating}

                                        />
                                    </div>
                                    <label className="product-details-point-heading" htmlFor="comment">Comment:</label>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="comment"
                                        name="comment"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit" onClick={reviewSubmitHandler}>Submit</Button>
                                </DialogActions>
                            </Dialog>
                            <form className="product-details-quantity" onSubmit={cartSubmitHandler}>
                                <div className="product-details-quantity-btns ">
                                    <button className="product-details-quantity-btn quantity-btns-1" onClick={(e) => {
                                        e.preventDefault();
                                        setQuantity(quantity => quantity < 2 ? quantity : quantity - 1);
                                    }}><RemoveIcon /></button>
                                    <span className="product-details-quantity-input">{quantity}</span>
                                    <button className="product-details-quantity-btn quantity-btns-2" onClick={(e) => {
                                        e.preventDefault();
                                        setQuantity(quantity => quantity >= product.stock ? quantity : quantity + 1);
                                    }}><AddIcon /></button>
                                </div>
                                <div>
                                    <button type="submit" className="product-details-addtocart-btn">Add to Cart</button>
                                </div>

                            </form>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                {review ? "Update" : "Submit"} Review
                            </Button>
                        </div>
                    </section>
                    <section className="productdetails-page-details-section">
                        <div className="product-details-guaranteesItems-container">
                            <h3>Top Offers & Guarantees</h3>
                            <div className="product-details-guaranteesItems">
                                {guaranteesItems.map((item) => {
                                    return (
                                        <div className="product-details-guaranteesItem">
                                            <img src={item.img} alt={item.name} />
                                            <span>{item.name}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="product-details-discription">
                            <h3>Product Description</h3>
                            <p>{product.discription}</p>
                        </div>
                        {product.specifications &&
                            <div className="product-details-specifications-container">
                                <h3>Specifications</h3>
                                {specificationOpen &&
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                {product.specifications.map((row) => (
                                                    <TableRow
                                                        key={row.key}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.key}
                                                        </TableCell>
                                                        <TableCell align="right">{row.value}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }

                            </div>

                        }
                        <div className="product-details-content-reducer-container" onClick={() => setSpecificationOpen(val => !val)}>{specificationOpen ?
                            <p><KeyboardDoubleArrowUpIcon /><span> Show Less</span></p> :
                            <p><KeyboardDoubleArrowDownIcon /><span>Show More</span></p>}</div>
                    </section>
                    <section className="reviews">
                        <div className="reviews-heading">
                            <h3>Reviews</h3>
                        </div>
                        <div className="allReviews">
                            {product && product.review && product.review.length !== 0 ? product.review.map((item) => (
                                <Review key={item._id} review={item} user_id={user && user._id} setisReviewChanged={{ setisReviewChanged, isReviewChanged }} />
                            )) : <h4>No Reviews</h4>}
                        </div>
                    </section>
                    {similarProducts &&
                        <section className="product-details-similar-products">
                            <h3>Similar Product</h3>
                            <div>
                                {similarProducts.map((item, index) => {
                                    return (
                                        <ProductBox prod={item} />
                                    )
                                })}
                            </div>
                        </section>
                    }
                    {recentProducts &&
                        <section className="product-details-recent-products">
                            <h3>Recent Product</h3>
                            <div>
                                {recentProducts.map((item, index) => {
                                    return (
                                        <ProductBox prod={item} />
                                    )
                                })}
                            </div>
                        </section>
                    }

                </main>}

        </Fragment>
    );
}
