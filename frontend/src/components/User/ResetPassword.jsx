import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux"
import "./ForgotPassword.css"
import Loader from "../layout/Loader/Loader";
import { changePassword } from "../../actions/UserAction"
import { useParams } from "react-router-dom"
import { TiTickOutline } from "react-icons/ti";
import MetaData from "../layout/MetaData";
export default function ResetPassword() {
    const [password, setpassword] = useState({
        newpassword: "",
        confirmpassword: ""
    })
    const { token } = useParams()
    const [showpassword, setShowPassword] = useState(false)
    const [showconfirmpassword, setShowConfirmPassword] = useState(false)
    const { success, message, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(password)
        dispatch(changePassword(password, token))

    }
    return (
        <Fragment>
            <MetaData title="Reset Password -- Epic Essentials" />
            <main className="reset-password-main">
                <h1>Reset Password</h1>
                {loading ? <Loader /> :
                    <section className="reset-password-box">
                        {!success ?
                            <form onSubmit={formSubmitHandler}>
                                <div className="resetPassword newpassword" onDoubleClick={() => setShowPassword(val => !val)}>
                                    <label htmlFor="newpassword">New Password:</label>
                                    <input type={showpassword ? "text" : "password"} id="newpassword"
                                        placeholder="New Password"
                                        name="newpassword" value={password.newpassword}
                                        onChange={(v) => setpassword(password => ({ ...password, newpassword: v.target.value }))} required />
                                </div>
                                <div className="resetPassword confirmpassword" onDoubleClick={() => setShowConfirmPassword(val => !val)}>
                                    <label htmlFor="confirmpassword">Confirm Password:</label>
                                    <input type={showconfirmpassword ? "text" : "password"} id="confirmpassword"
                                        placeholder="Confirm Password"
                                        name="confirmpassword" value={password.confirmpassword}
                                        onChange={(v) => setpassword({ ...password, confirmpassword: v.target.value })} required />
                                </div>
                                <button>Change Password</button>
                            </form> :
                            <div className="resetPassword-success">
                                <TiTickOutline />
                                <span > {message}</span>
                            </div>
                        }
                    </section>}
            </main>
        </Fragment>
    )
}