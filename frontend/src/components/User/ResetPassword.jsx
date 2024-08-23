import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux"
import "./ForgotPassword.css"
import Loader from "../layout/Loader/Loader";
import {changePassword} from "../../actions/UserAction"
import {useParams} from "react-router-dom"
export default function ResetPassword() {
    const [password, setpassword] = useState({
        newpassword: "",
        confirmpassword: ""
    })
    const {token}=useParams()
    const { success, message, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(password)
        dispatch(changePassword(password,token))
        
    }
    return (
        <Fragment>
            <main className="reset-password-main">
                {loading ? <Loader /> :
                    <section className="reset-password-box">
                        {!success ?
                            <form onSubmit={formSubmitHandler}>
                                <div className="resetPassword newpassword">
                                    <label htmlFor="newpassword">New Password:</label>
                                    <input type="password" id="newpassword"
                                        placeholder="New Password"
                                        name="newpassword" value={password.newpassword}
                                        onChange={(v) => setpassword(password=>({...password,newpassword:v.target.value}))} required />
                                </div>
                                <div className="resetPassword confirmpassword">
                                    <label htmlFor="confirmpassword">confirm password:</label>
                                    <input type="password" id="confirmpassword"
                                        placeholder="Confirm Password"
                                        name="confirmpassword" value={password.confirmpassword}
                                        onChange={(v) => setpassword({...password,confirmpassword:v.target.value})} required />
                                </div>
                                <button>Change Password</button>
                            </form> :
                            <div>
                                <span>{message}</span>
                            </div>
                        }
                    </section>}
            </main>
        </Fragment>
    )
}