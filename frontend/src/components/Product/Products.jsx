import "./Products.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, Fragment, useState, useMemo } from "react";
import { getProducts } from "../../actions/ProductAction";
import Product from "../layout/Home/Product";
import { useLocation, useNavigate } from "react-router-dom";
import NoProductFound from "./NoProductFound";
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ReactStars from "react-rating-stars-component";
import MetaData from "../layout/MetaData";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { MdOutlineStarPurple500 } from "react-icons/md";
const allcategory = [
    "Phone", "Monitor", "Mouse", "Chair", "Desk", "Keyboard", "Headset", "PC",
    "Mousepad", "Controller", "Speakers", "Gaming Bag", "VR Headset", "Gaming Console", "Gaming Laptop"
];

export default function Products() {
    const dispatch = useDispatch();
    const query = new URLSearchParams(useLocation().search);
    const keyWord = query.get("keyword");
    const pageQuery = query.get("page") || 1;
    const [currentPage, setCurrentPage] = useState(parseInt(pageQuery));
    const [filterPrice, setFilterPrice] = useState([99, 400000]);
    const [category, setCategory] = useState(query.get("category"));
    const [rating, setRating] = useState();
    const [filterOpen, setFilterOpen] = useState(window.innerWidth > 600);
    const navigate = useNavigate()
    const handlePriceChange = (event, newValue) => {
        setFilterPrice(newValue);
    };

    const params = useMemo(() => ({
        keyWord,
        page: currentPage,
        "price[lte]": filterPrice[1],
        "price[gt]": filterPrice[0],
        category,
        rating
    }), [keyWord, currentPage, filterPrice, category, rating]);

    const { products, error, loading, productsCount } = useSelector(state => state.products);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const clearfiltersubmithandler = () => {
        setRating(0);
        setCategory();
        setCurrentPage(1)
        dispatch(getProducts());
        navigate("/products")
        if (window.innerWidth <= 600) {
            setFilterOpen(false);
        }
    };

    useEffect(() => {
        setCurrentPage(parseInt(pageQuery));
        dispatch(getProducts(params));
    }, [pageQuery]);

    if (loading) {
        return <Loader />;
    }

    const filtersubmithandler = () => {
        dispatch(getProducts(
            {
                "price[lte]": filterPrice[1],
                "price[gt]": filterPrice[0],
                category: category && category,
                rating: rating ? rating : 0
            }
        ));
        setCurrentPage(1)
        if (window.innerWidth <= 600) {
            setFilterOpen(false);
        }
    };
    return (
        <Fragment>
            <MetaData title={"Products--Epic Essentials"} />
            {window.innerWidth > 600 ? <h1 className="products-main-heading">PRODUCTS</h1> : <img className="filters-brand-logo" src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724501835/Epic%20Essentials/sfrepmxrnvmjm8zrjyoa.png" alt="" />}
            <div className="container">
                <aside className="filters">
                    <div className="filters-brand-container">
                        {window.innerWidth < 600 ? <h1 className="products-main-heading">PRODUCTS</h1> : <img className="filters-brand-logo" src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724501835/Epic%20Essentials/sfrepmxrnvmjm8zrjyoa.png" alt="" />}
                        <div>
                            <button className="filters-btn" onClick={() => setFilterOpen(val => !val)}><TbAdjustmentsHorizontal /> Filters</button>
                        </div>
                    </div>
                    <div className={`filters-container ${filterOpen ? "filters-container-open" : "filters-container-close"}`}>
                        <div className="filters-pricing-container">
                            <h2 className="filter-headings">Price</h2>
                            <div className="filter-price-range">
                                <Box>
                                    <Slider
                                        getAriaLabel={() => 'Price'}
                                        value={filterPrice}
                                        onChange={handlePriceChange}
                                        valueLabelDisplay="auto"
                                        min={99}
                                        step={1}
                                        max={400000}
                                    />
                                </Box>
                            </div>
                            <div className="filter-price-display">
                                <div>₹ <input type="number" onChange={(e)=>setFilterPrice(val=>[e.target.value,val[1]])} value={filterPrice[0]} /></div>
                                <div>₹ <input type="number" onChange={(e)=>setFilterPrice(val=>[val[0], e.target.value])} value={filterPrice[1]} /></div>
                            </div>
                        </div>
                        <div className="filters-catogories-container">
                            <h2 className="filter-headings">Categories</h2>
                            {allcategory.map((item) => (
                                <div
                                    key={item}
                                    onClick={() => setCategory(item)}
                                    className={params.category === item ? "category-selected" : ""}
                                    style={{ color: params.category === item ? "blue" : undefined }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="filters-rating-container">
                            <h2 className="filter-headings">Rating</h2>
                            <div>
                                <ReactStars
                                    count={5}
                                    onChange={(rating) => setRating(rating)}
                                    size={24}
                                    activeColor="#ffd700"
                                    isHalf={true}
                                />
                                <p>{rating || 0}<span><MdOutlineStarPurple500 /></span> & More</p>
                            </div>
                        </div>
                        <div className="filter-btn-container">
                            <button onClick={filtersubmithandler}>Filter</button>
                            <button onClick={clearfiltersubmithandler}>Clear All Filters</button>
                        </div>
                    </div>
                </aside>
                <main className="products-page-main">
                    <section className="products-section">
                        {products && products.length > 0 ?
                            <section className="products">
                                {products.map((prod) => (
                                    <Product key={prod._id} prod={prod} />
                                ))}
                            </section>
                            : <NoProductFound />}
                    </section>
                </main>
            </div>
            {Math.ceil(productsCount / 12) > 1 &&
                <section className="pagination">
                    <Pagination
                        page={currentPage}
                        onChange={handleChange}
                        count={Math.ceil(productsCount / 12)}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/products?${item.page ? `page=${item.page}` : ""}&price[lte]=${filterPrice[1]}&price[gt]=${filterPrice[0]}${category ? `&category=${category}` : ""}${rating ? `&rating=${rating}` : ""}`}
                                {...item}
                            />
                        )}
                    />
                </section>}
        </Fragment>
    );
}
