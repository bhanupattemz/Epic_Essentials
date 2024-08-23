import React, { Fragment, useState, useEffect } from "react"
import { FaLockOpen, FaUnlock, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { passwordUpdate,clearErrors } from "../../actions/UserAction"
import {useNavigate} from "react-router-dom"
import {useAlert} from "react-alert"
import "./UpdatePassword.css"
import Loader from "../layout/Loader/Loader";


export default function UpdatePassowrd() {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const alert=useAlert()
    const { loading, user,isPasswordUpdated,error ,isauthenticate} = useSelector(state => state.user)
    const [password, setpassword] = useState({
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
    })
    const updateSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(passwordUpdate(password,user._id))
    }
    useEffect(()=>{ 
        if(isPasswordUpdated){
            navigate("/profile")
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    },[navigate,isPasswordUpdated,error,alert])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <main className="update-password-main">
                        <div className="update-password-container">
                            <div className="update-password-box">
                                <h2>Update Password</h2>
                                <form className="update-password-form" onSubmit={updateSubmitHandler} encType="multipart/form-data">
                                    <div className="update-password">
                                        <label htmlFor="oldpassword"><FaLockOpen /></label>
                                        <input type="password" name="oldpassword" id="oldpassword" placeholder="oldpassword"
                                            onChange={(e) => setpassword({ ...password, oldpassword: e.target.value })} />
                                    </div><div className="update-password">
                                        <label htmlFor="newpassword"><FaUnlock /></label>
                                        <input type="password" name="newpassword" id="newpassword" placeholder="new password"
                                            onChange={(e) => setpassword({ ...password, newpassword: e.target.value })} />
                                    </div><div className="update-password">
                                        <label htmlFor="confirmpassword"><FaLock /></label>
                                        <input type="password" name="confirmpassword" id="confirmpassword" placeholder="Confirm Password"
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