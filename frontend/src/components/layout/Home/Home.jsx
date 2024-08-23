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
                            <p>Welcome to Epic Essentials</p>
                            <h1>Find Amazing Products Below</h1>
                            <button onClick={scrollToPosition}>
                                Scroll <SiScrollreveal />
                            </button>
                        </div>
                        <section className="carousel-section">
                            <Carousel />
                        </section>
                        <section className="home-page-recent-products-container">
                            <h3>Recent Products</h3>
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
                        <section className="home-page-featured-products">
                            <div className="products-heading">
                                <h3>Featured Products</h3>
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
