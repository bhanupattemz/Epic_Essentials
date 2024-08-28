import SideBar from "./SideBar.jsx"
import "./AdminUpdateUser.css"
import { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../layout/Loader/Loader.jsx"
import MetaData from "../layout/MetaData.jsx"
import { useParams } from "react-router"
import {
    adminGetUserDetails, adminUpdateUserDetails,
    adminDeleteUser, adminBlockAndUnblockUserDetails
} from "../../actions/UserAction.jsx"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
export default function AdminUpdateUser() {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, user } = useSelector(state => state.userDetails)
    const [deleteUserPop, setDeleteUserPop] = useState(false)
    const [updateUserPop, setUpdateUserPop] = useState(false)
    const [msg, setmsg] = useState("")
    const [role, setrole] = useState("")
    const navigate = useNavigate()
    // const []
    const { _id } = useParams()
    const updateUserHandler = async () => {
        setUpdateUserPop(false)
        if (msg === "") {
            alert.error("msg is requires")
        } else {
            if (role === "blocked") {
                await dispatch(adminBlockAndUnblockUserDetails(_id, { block: !user.isBlocked, msg }))
            } else {
                await dispatch(adminUpdateUserDetails(_id, { role, msg }))
            }
            navigate("/admin/users")
        }


    }
    const deleteUserhandler = async () => {
        setDeleteUserPop(false)
        if (msg === "") {
            alert.error("msg is requires")
        } else {
            dispatch(adminDeleteUser(_id, { msg }))
            navigate("/admin/users")
        }
    }
    useEffect(() => {
        user && setrole(user.role)
    }, [dispatch, user])
    useEffect(() => {
        dispatch(adminGetUserDetails(_id))
    }, [dispatch, adminGetUserDetails])
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'green';
            case 'blocked':
                return 'red';
            default:
                return 'grey';
        }
    };
    const getUpdateText = (role) => {
        if (role == "blocked") {
            return `Do you want to confirm blocking ${user.username}?`;
        } else if (user.role === "blocked" && role == "user") {
            return `Do you want to unblock ${user.username}?`;
        } else if (role == "admin") {
            return `Do you want to confirm promoting ${user.username} to Admin?`;
        } else {
            return `Do you want to confirm demoting ${user.username} to User?`;
        }
    }
    return (
        <Fragment>
            <main className="admin-update-user-main">
                {deleteUserPop &&
                    <section className="admin-delete-user-conformation">
                        <div className="admin-delete-user-box">
                            <h3>Delete Account</h3>
                            <p>Are you sure you want to delete {user.username}'s account?<br />
                                This action cannot be undone and all {user.username}'s data will be permanently removed. Please confirm to proceed.</p>
                            <div className="admin-user-update-msg-div">
                                <label htmlFor="msg">Enter Msg to User:</label>
                                <textarea name="msg" id="msg" value={msg}
                                    onChange={(e) => setmsg(e.target.value)} required>"Msg TO User About Changes"</textarea>
                            </div>
                            <div>
                                <button className="admin-update-user-delete-btn" onClick={deleteUserhandler}>Delete</button>
                                <button className="admin-update-user-delete-cancel-btn" onClick={(e) => {
                                    e.preventDefault();
                                    setDeleteUserPop(false)
                                }}>Cancel</button>
                            </div>
                        </div>
                    </section>}
                {updateUserPop &&
                    <section className="admin-update-user-conformation">
                        <div className="admin-update-user-box">
                            <h3>{role} {user.username}</h3>
                            <p>{getUpdateText(role)}</p>
                            <div className="admin-user-update-msg-div">
                                <label htmlFor="msg">Enter Msg to User:</label>
                                <textarea name="msg" id="msg" value={msg}
                                    onChange={(e) => setmsg(e.target.value)} required>"Msg TO User About Changes"</textarea>
                            </div>
                            <div>
                                <button className="admin-update-user-update-btn" onClick={updateUserHandler}>{user.isBlocked ? "Unblock" : "Block"}</button>
                                <button className="admin-update-user-update-cancel-btn" onClick={(e) => {
                                    e.preventDefault();
                                    setUpdateUserPop(false)
                                }}>Cancel</button>
                            </div>
                        </div>
                    </section>}
                <section className="admin-update-user-sidebar">
                    <SideBar />
                </section>
                {user ? <section className="admin-update-user-main-content">
                    <div className="admin-update-user-card">
                        {loading ? <Loader /> :
                            <Fragment>
                                <MetaData title={`${user.username} update --Epic Essentials`} />
                                <h3 >{user.username}'s Profile <span style={{ color: getRoleColor(user.role) }}>
                                    {`(${user.role} `}
                                    {user.isBlocked && <span style={{ color: getRoleColor('blocked') }}>Blocked</span>} {')'}
                                </span></h3>
                                <div className="admin-update-profile-pic">
                                    <img src={user.avatar[0].url} alt="user-admin-update-profile-img" />
                                    <h4>Id: {user._id}</h4>
                                </div>
                                <div className="admin-update-profile-data">
                                    <div>
                                        <h4>Full Name</h4>
                                        <span>{user.username}</span>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <span>{user.email}</span>
                                    </div>
                                    <div>
                                        <h4>Join on</h4>
                                        <span>{user.createdAt.slice(0, 10)}</span>
                                    </div>
                                </div>

                                <div className="admin-update-user-types">

                                    <button className="admin-update-user-delete-btn" onClick={(e) => {
                                        setrole("blocked")
                                        setUpdateUserPop(true)
                                    }}>{user.isBlocked ? "Unblock" : "Block"} User</button>
                                    {!user.isBlocked &&
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            setUpdateUserPop(true)

                                        }}>
                                            <select name="role" id="role" onChange={(e) => setrole(e.target.value)}>
                                                <option >Select Role</option>
                                                {user.role !== "user" && <option value="user">User</option>}
                                                {user.role !== "admin" && <option value="admin">admin</option>}
                                            </select>
                                            <button>submit</button>
                                        </form>}

                                    <button className="admin-update-user-delete-btn" onClick={(e) => setDeleteUserPop(true)}>Delete User</button>
                                </div>
                            </Fragment>
                        }
                    </div>
                </section> : <h2>User Not Found</h2>}
            </main>
        </Fragment>
    )
}