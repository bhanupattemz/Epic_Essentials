import "./Home.css";
import React, { Fragment, useEffect } from "react";
import { SiScrollreveal } from "react-icons/si";
import Product from "./Product";
import MetaData from "../MetaData";
import { getProducts } from "../../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert"
import Carousel from "./Carousel";
import Catagory from "./Catagory";
import { PiMouseLeftClickFill } from "react-icons/pi";
export default function Home() {
    const dispatch = useDispatch();
    const alert = useAlert()
    const { loading, error, products } = useSelector((state) => state.products);
    const recentProducts = JSON.parse(localStorage.getItem("recent")) || []
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts({}));
    }, [dispatch, error]);
    const scrollToPosition = () => {
        const nextSection = document.querySelector('.carousel-section');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Fragment>
            <main className="home-page-main">
                {loading ? <Loader /> :
                    <Fragment>
                        <MetaData title="Epic Essentials" />
                        <div className="banner">
                            <h1>WELCOME TO</h1>
                            <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724501835/Epic%20Essentials/sfrepmxrnvmjm8zrjyoa.png" alt="" />

                            <button onClick={scrollToPosition} className="home-banner-btn">
                                Scroll <span><PiMouseLeftClickFill /></span>
                            </button>
                        </div>
                        <section className="carousel-section">
                            <Carousel />
                        </section>
                        {
                            recentProducts && recentProducts.length>0 &&
                            <section className="home-page-recent-products-container">
                                <h2>Recent Products</h2>
                                <div className="home-page-recent-products">
                                    {recentProducts &&
                                        recentProducts.map((prod) => {
                                            return (
                                                <div>
                                                    <Product key={prod._id} prod={prod} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </section>
                        }

                        <section className="home-page-featured-products">
                            <div className="products-heading">
                                <h2>Featured Products</h2>
                            </div>
                            <div className="products">
                                {products && products.map((prod) => {
                                    return <Product key={prod._id} prod={prod} />
                                })}
                            </div>
                        </section>

                    </Fragment>}
            </main>

        </Fragment>
    );
}
