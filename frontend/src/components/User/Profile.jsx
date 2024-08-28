import React, { useEffect, Fragment, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "../layout/Loader/Loader"
import MetaData from "../layout/MetaData"
import { deleteUser } from "../../actions/UserAction"
import SideBar from "./SideBar"
import "./Profile.css"
export default function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isauthenticate, loading } = useSelector(state => state.user)
    const [deleteUserPop, setDeleteUserPop] = useState(false)
    const deleteUserhandler = () => {
        dispatch(deleteUser())
    }
    useEffect(() => {
        if (!isauthenticate) {
            navigate("/profile")
        }
    }, [isauthenticate])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>

                    <main className="profile-page-main">
                        {deleteUserPop &&
                            <section className="delete-user-conformation">
                                <div className="delete-user-box">
                                    <h3>Delete Account</h3>
                                    <p>Are you sure you want to delete your account?
                                        This action cannot be undone and all your data will be permanently removed. Please confirm to proceed.</p>
                                    <div>
                                        <button className="user-delete-btn" onClick={deleteUserhandler}>Delete</button>
                                        <button className="user-delete-cancel-btn" onClick={(e) => {
                                            e.preventDefault();
                                            setDeleteUserPop(false)
                                        }}>Cancel</button>
                                    </div>
                                </div>
                            </section>}
                        <MetaData title={`${user.username} --Epic Essentials`} />
                        <section className="profile-page-side-bar">
                            <SideBar curent_place={"profile"} />
                        </section>
                        <section className="profile-page-content">
                            <div>
                                <h1 className="profile-page-heading">Profile Information</h1>
                            </div>
                            <div className="profile-page-content-information">
                                <div>
                                    <h2>Personal Information</h2>
                                    <div className="profile-page-information-content">
                                        <p>{user.username} {`(${user._id})`}</p>
                                    </div>
                                </div>
                                <div>
                                    <h2>Email Address</h2>
                                    <div className="profile-page-information-content">
                                        <p >{user.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <h2>Role</h2>
                                    <div className="profile-page-information-content">
                                        <p>{user.role}</p>
                                    </div>
                                </div>
                                <div>
                                    <h2>Join On</h2>
                                    <div className="profile-page-information-content">
                                        <p>{user.createdAt.slice(0, 10)}</p>
                                    </div>
                                </div>
                                <div className="profile-btns-container">
                                    <div onClick={()=>navigate("/UpdateProfile")} >Edit Profile</div>
                                    <div onClick={(e) => {
                                        e.preventDefault();
                                        setDeleteUserPop(true)
                                    }}
                                    >Delete Account</div>
                                    <div className="profile-btn-changepassword" onClick={()=>navigate(`/password/update/${user._id}`)}
                                       >Change Password</div>
                                </div>
                            </div>

                        </section >
                    </main>
                </Fragment>
            }

        </Fragment>
    )
}