import "./Products.css"
import Loader from "../layout/Loader/Loader"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, Fragment, useState, useMemo } from "react"
import { useAlert } from "react-alert"
import { getProducts } from "../../actions/ProductAction"
import Product from "../layout/Home/Product"
import { useLocation } from "react-router-dom"
import NoProductFound from "./NoProductFound"
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import ReactStars from "react-rating-stars-component";
import MetaData from "../layout/MetaData"
const allcategory = [
    "Phone",
    "Monitor",
    "Mouse",
    "Chair",
    "Desk",
    "Keyboard",
    "Headset",
    "PC",
    "Mousepad",
    "Controller",
    "Speakers",
    "Gaming Bag",
    "VR Headset",
    "Gaming Console",
    "Gaming Laptop"
]
export default function Products() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const query = new URLSearchParams(useLocation().search)
    const keyWord = query.get("keyword") || ""
    const pageQuery = query.get("page") || 1
    let dup = 0
    const [currentPage, setCurrentPage] = useState(parseInt(pageQuery))
    const [filterPrice, setFilterPrice] = React.useState([0, 25000]);
    const [category, setcategory] = useState(allcategory)
    const [rating, setRating] = useState()

    const handlePriceChange = (event, newValue) => {
        setFilterPrice(newValue);

    };

    const params = useMemo(() => ({
        keyWord,
        page: currentPage,
        "price[lte]": filterPrice[1],
        "price[gt]": filterPrice[0],
        category, rating
    }), [keyWord, currentPage, filterPrice, category, rating])

    const { products, error, loading, productsCount } = useSelector(state => state.products)

    const handleChange = (event, value) => {
        setCurrentPage(value)
    }
    const clearfiltersubmithandler=()=>{
        dispatch(getProducts())
    }

    useEffect(() => {
        setCurrentPage(parseInt(pageQuery))
    }, [pageQuery])

    if (loading) {
        return <Loader />
    }
    const filtersubmithandler=()=>{
        dispatch(getProducts(params))
    }
    return (
        <Fragment>
            <MetaData title={"Products--Epic Essentials"} />
            <h2>Products</h2>
            <div className="container">
                <aside className="filters">
                    <div>
                        <h3>Price</h3>
                        <Box >
                            <Slider
                                getAriaLabel={() => 'Price'}
                                value={filterPrice}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                min={99}
                                step={1}
                                max={25000}
                            />
                        </Box>
                    </div>
                    <div>
                        <h3>Catogories</h3>
                        {allcategory.map((item) => {
                            return (
                                <li key={item} onClick={() => setcategory(item)} style={{color:params.category===item && "blue"}}>{item}</li>
                            )
                        })}
                    </div>
                    <div>
                        <h3>Rating</h3>
                        <ReactStars
                            count={5}
                            onChange={(rating) => setRating(rating)}
                            size={24}
                            activeColor="#ffd700"
                            isHalf={true}
                        />
                    </div>
                    <button onClick={filtersubmithandler}>Filter</button>
                    <button onClick={clearfiltersubmithandler}>Clear All Filters</button>
                </aside>
                <main className="products-page-main">
                    <section className="products-section">
                        {products && products.length > 0 ?
                            <section className="products">
                                {products.map((prod) => {
                                    return <Product key={prod._id} prod={prod} />
                                })}
                            </section>
                            : <NoProductFound />}
                    </section>

                </main>
            </div>
            {Math.ceil(productsCount / 10) > 1 &&
                <section className="pagination">
                    <Pagination
                        page={currentPage}
                        onChange={handleChange}
                        count={Math.ceil(productsCount / 10)}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/products${item.page === 1 ? '' : `?page=${item.page}`}`}
                                {...item}
                            />
                        )}
                    />
                </section>}
        </Fragment >
    )
}
