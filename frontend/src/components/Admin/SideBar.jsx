import "./SideBar.css"
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Fragment } from "react";
import { FaDropbox } from "react-icons/fa";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import React, { useState } from "react";
export default function SideBar() {
    const navigate = useNavigate()
    const position = useLocation().pathname
    const [openSidebar, setOpenSidebar] = useState(window.innerWidth < 600 ? false : true)
    return (
        <Fragment>
            <section className="sidebar-main-container">
                <div className="dashboard-sidebar-logo-container">
                    <img className="dashboard-sidebar-logo-img" src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724501835/Epic%20Essentials/sfrepmxrnvmjm8zrjyoa.png" alt="epic-logo-img" />
                    {window.innerWidth < 600 && <button className="dashboard-sidebar-memu-btn" onClick={() => setOpenSidebar(val => !val)} >MENU</button>}
                </div>
               
                    <div className={`sidebar-items ${openSidebar ? "dashboard-sidebar-open" : "dashboard-sidebar-close"}`}>
                        <div onClick={() => navigate("/admin/dashboard")} className={`${position === "/admin/dashboard" ? "dashboard-selected-item" : ""}`} >
                            <p><MdDashboard />Dashboard</p>
                        </div>
                        <div >
                            <SimpleTreeView>
                                <TreeItem itemId="grid" label="Products">
                                    <p onClick={() => navigate("/admin/products")} className={`${position === "/admin/products" ? "dashboard-selected-item" : ""}`}><TreeItem itemId="grid-community" label="Products" /></p>
                                    <p onClick={() => navigate("/admin/product/new")} className={`${position === "/admin/products/new" ? "dashboard-selected-item" : ""}`}><TreeItem itemId="grid-pro" label={<div><FaPlus />Add Products</div>} /></p>
                                </TreeItem>

                            </SimpleTreeView>
                        </div>
                        <div onClick={() => navigate("/admin/orders")} className={`${position === "/admin/orders" ? "dashboard-selected-item" : ""}`}>
                            <p><FaDropbox />Orders</p>
                        </div>
                        <div onClick={() => navigate("/admin/users")} className={`${position === "/admin/users" ? "dashboard-selected-item" : ""}`}>
                            <p><FaUsers />Users</p>
                        </div>
                        <div onClick={() => navigate("/admin/reviews")} className={`${position === "/admin/reviews" ? "dashboard-selected-item" : ""}`}>
                            <p><MdRateReview />Reviews</p>
                        </div>
                    </div>
                

            </section>
        </Fragment>
    )
}