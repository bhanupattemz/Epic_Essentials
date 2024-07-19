import "./Search.css"
import { CiSearch } from "react-icons/ci";
import React, { Fragment, useState } from "react"
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
export default function Search() {
    const [keyword, setkeyword] = useState("");
    const navigate=useNavigate()
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products?keyword=${keyword}`)
        }else{
            navigate(`/products`)
        }
    }
    return (
        <Fragment>
            <MetaData title={`Search-Epic Essentials`}/>
            <main className="search">
                <section className="search-section">
                    <form action="" className="search-form" onSubmit={searchSubmitHandler}>
                        <input type="text" placeholder="Search Products" onChange={e => setkeyword(e.target.value)} className="search-input" />
                        <button className="search-button">search</button>
                    </form>

                </section>
            </main>

        </Fragment>
    )
}