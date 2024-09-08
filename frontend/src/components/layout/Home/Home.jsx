import "./Home.css";
import React, { Fragment, useEffect } from "react";
import { SiScrollreveal } from "react-icons/si";
import Product from "./Product";
import MetaData from "../MetaData";
import { getProducts } from "../../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import Carousel from "./Carousel";
import Catagory from "./Catagory";
import { PiMouseLeftClickFill } from "react-icons/pi";

export default function Home() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, products } = useSelector((state) => state.products);
    const recentProducts = JSON.parse(localStorage.getItem("recent")) || [];

    useEffect(() => {
        if (error) {
            alert.error(error);
        }
        dispatch(getProducts());
    }, [dispatch]);

    const scrollToPosition = () => {
        const nextSection = document.querySelector('.carousel-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const hasRecentProducts = recentProducts && recentProducts.length > 0;
    const hasProducts = products && products.length > 0;

    return (
        <main className="home-page-main">
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Epic Essentials" />
                    <div className="banner">
                        <h1>WELCOME TO</h1>
                        <img 
                            src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724501835/Epic%20Essentials/sfrepmxrnvmjm8zrjyoa.png" 
                            alt="home-page-image" 
                        />
                        <button onClick={scrollToPosition} className="home-banner-btn">
                            Scroll <span><PiMouseLeftClickFill /></span>
                        </button>
                    </div>
                    
                    <section className="carousel-section">
                        <Carousel />
                    </section>
                    
                    {hasRecentProducts && (
                        <section className="home-page-recent-products-container">
                            <h2>Recent Products</h2>
                            <div className="home-page-recent-products">
                                {recentProducts.map((prod) => (
                                    <Product key={prod._id} prod={prod} />
                                ))}
                            </div>
                        </section>
                    )}

                    {hasProducts && (
                        <section className="home-page-featured-products">
                            <div className="products-heading">
                                <h2>Featured Products</h2>
                            </div>
                            <div className="products">
                                {products.map((prod) => (
                                    <Product key={prod._id} prod={prod} />
                                ))}
                            </div>
                        </section>
                    )}
                </Fragment>
            )}
        </main>
    );
}
