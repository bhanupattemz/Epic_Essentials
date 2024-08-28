import React, { Fragment, useState, useEffect } from "react"
import { FaLockOpen, FaUnlock, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { passwordUpdate, clearErrors } from "../../actions/UserAction"
import { useNavigate } from "react-router-dom"
import "./UpdatePassword.css"
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";

export default function UpdatePassowrd() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, user, isPasswordUpdated, error, isauthenticate } = useSelector(state => state.user)
    const [password, setpassword] = useState({
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
    })
    const [oldpasswordshow, setOldPasswordShow] = useState(false)
    const [newpasswordshow, setnewPasswordShow] = useState(false)
    const [confirmpasswordshow, setconfirmPasswordShow] = useState(false)
    const updateSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(passwordUpdate(password, user._id))
    }
    useEffect(() => {
        if (isPasswordUpdated) {
            navigate("/profile")
        }

    }, [navigate, isPasswordUpdated])
    return (
        <Fragment>
            <MetaData title="Update Password - Epic Essentials" />
            {loading ? <Loader /> :
                <Fragment>
                    <main className="update-password-main">
                        <div className="update-password-container">
                            <div className="update-password-box">
                                <h2>Update Password</h2>
                                <form className="update-password-form" onSubmit={updateSubmitHandler} encType="multipart/form-data">
                                    <div className="update-password" onDoubleClick={()=>setOldPasswordShow(val=>!val)}>
                                        <label htmlFor="oldpassword"><FaLockOpen /></label>
                                        <input type={oldpasswordshow ? "text" : "password"} name="oldpassword" id="oldpassword" placeholder="oldpassword"
                                            onChange={(e) => setpassword({ ...password, oldpassword: e.target.value })} />
                                    </div><div className="update-password" onDoubleClick={()=>setnewPasswordShow(val=>!val)}>
                                        <label htmlFor="newpassword"><FaUnlock /></label>
                                        <input type={newpasswordshow ? "text" : "password"} name="newpassword" id="newpassword" placeholder="new password"
                                            onChange={(e) => setpassword({ ...password, newpassword: e.target.value })} />
                                    </div><div className="update-password" onDoubleClick={()=>setconfirmPasswordShow(val=>!val)}>
                                        <label htmlFor="confirmpassword"><FaLock /></label>
                                        <input type={confirmpasswordshow ? "text" : "password"} name="confirmpassword" id="confirmpassword" placeholder="Confirm Password"
                                            onChange={(e) => setpassword({ ...password, confirmpassword: e.target.value })} />
                                    </div>
                                    <button className="update-password-button">Update</button>
                                </form>
                            </div>
                        </div>
                    </main>
                </Fragment>
            }
        </Fragment>
    )
}