import "./Home.css";
import React, { Fragment, useEffect } from "react";
import { SiScrollreveal } from "react-icons/si";
import Product from "./Product";
import MetaData from "../MetaData";
import { getProducts } from "../../../actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert"
export default function Home() {
    const dispatch = useDispatch();
    const alert = useAlert()
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts({}));
    }, [dispatch, error]);
    const scrollToPosition = () => {
        const nextSection = document.querySelector('.products-heading');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Fragment>
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
                    <div className="products-heading">
                        <h2>Featured Products</h2>
                    </div>
                    <div className="products">
                        {products && products.map((prod) => {
                            return <Product key={prod._id} prod={prod} />
                        })}
                    </div>
                </Fragment>}
        </Fragment>
    );
}
