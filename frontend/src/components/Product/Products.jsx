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
    "laptops",
    "shoes",
    "books",
    "phone",
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
    "Category 9",
    "Category 10",
]
export default function Products() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const query = new URLSearchParams(useLocation().search)
    const keyWord = query.get("keyword") || ""
    const pageQuery = query.get("page") || 1

    const [currentPage, setCurrentPage] = useState(parseInt(pageQuery))
    const [filterPrice, setFilterPrice] = React.useState([0, 25000]);
    const [category, setcategory] = useState(allcategory)
    const [rating, setRating] = useState(0)

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

    useEffect(() => {
        if (error) {
            alert.error(error)
        }
        dispatch(getProducts(params))
    }, [dispatch, params, alert, error])

    useEffect(() => {
        setCurrentPage(parseInt(pageQuery))
    }, [pageQuery])

    if (loading) {
        return <Loader />
    }

    return (
        <Fragment>
            <MetaData title={"Products--Epic Essentials"} />
            <h2>Products</h2>
            <div className="container">
                <aside className="filters">
                    <div>
                        <h3>Price</h3>
                        <Box sx={{ width: 300 }}>
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
                                <li key={item} onClick={() => setcategory(item)}>{item}</li>
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
                </aside>
                <main>
                    <section className="products-section">
                        {products && products.length > 0 ?
                            <section className="products">
                                {products.map((prod) => {
                                    return <Product prod={prod} />
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
