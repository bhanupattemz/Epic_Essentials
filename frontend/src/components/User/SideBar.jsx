import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import React, { Fragment } from "react";
import Loader from "../layout/Loader/Loader";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./SideBar.css"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { userLogout } from "../../actions/UserAction"
import { FaDropbox } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { FaMapLocationDot, FaCartShopping } from "react-icons/fa6";
import { FaUser, FaPowerOff } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
export default function SideBar({ curent_place }) {
    const { user, loading } = useSelector(state => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <Fragment>
            {loading ? <Loader /> :
                <div>
                    <div className="profile-sidebar-top-container">
                        <div className="profile-sidebar-avatar-container">
                            <img className="profile-sidebar-avatar" src={user.avatar[0].url} alt="profile-img" />
                            <div>
                                <span>Hello,</span>
                                <h3>{user.username}</h3>
                            </div>
                        </div>

                        <section className="mini-profile-Silder">
                            <div style={{ color: curent_place == "profile" && "blue" }} onClick={() => navigate("/profile")}>
                                <span className="mini-profile-svgs"><FaUser /></span>
                                <span>Profile</span>
                            </div>
                            <div style={{ color: curent_place == "address" && "blue" }} onClick={() => navigate("/profile/address")}>
                                <span className="mini-profile-svgs"><FaMapLocationDot /></span>
                                <span>Addresses</span>
                            </div>
                            <div onClick={() => navigate("/orders")}>
                                <span className="mini-profile-svgs"><FaDropbox /></span>
                                <span>Orders</span>
                            </div>
                            <div onClick={() => navigate("/cart")}>
                                <span className="mini-profile-svgs"><FaCartShopping /></span>
                                <span>Cart</span>
                            </div>
                            <div style={{ color: curent_place == "review" && "blue" }} onClick={() => navigate("/profile/reviews")}>
                                <span className="mini-profile-svgs"><MdRateReview /></span>
                                <span>Reviews</span>
                            </div>
                            <div onClick={() => dispatch(userLogout())}>
                                <span className="mini-profile-svgs"><FaPowerOff /></span>
                                <span>Logout</span>
                            </div>
                        </section>
                    </div>
                    <div className="profile-sidebar-items-container">
                        <div className="profile-sidebar-items">
                            <div className="profile-sidebar-items-headings" onClick={() => navigate("/orders")}><FaDropbox />MY ORDERS <span><ChevronRightIcon /></span></div>
                        </div>
                        <div className="profile-sidebar-items">
                            <div className="profile-sidebar-items-headings" onClick={() => navigate("/cart")}><ShoppingCartIcon />CART <span><ChevronRightIcon /></span></div>
                        </div>
                        <div className="profile-sidebar-items">
                            <div className="profile-sidebar-items-headings" style={{ backgroundColor: "rgba(12,12,12,0.1)" }}><PersonIcon />ACCOUNT SETTINGS</div>
                            <div className="profile-sidebar-items-subheading" >
                                <p style={{ color: curent_place == "profile" && "blue" }} onClick={() => navigate("/profile")}>Profile Information</p>
                                <p style={{ color: curent_place == "address" && "blue" }} onClick={() => navigate("/profile/address")}>Manage Addresses</p>
                            </div>
                        </div >

                        <div className="profile-sidebar-items" style={{ color: curent_place == "review" && "blue" }}>
                            <div className="profile-sidebar-items-headings" onClick={() => navigate("/profile/reviews")}><MdOutlineReviews />MY REVIEWS </div>
                        </div>
                        <div className="profile-sidebar-items">
                            <div className="profile-sidebar-items-headings" onClick={() => dispatch(userLogout())}><PowerSettingsNewIcon />LOGOUT</div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>


    )
}