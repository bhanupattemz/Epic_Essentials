import React, { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./ForgotPassword.css"
import { passwordreset } from "../../actions/UserAction"
import Loader from "../layout/Loader/Loader"
import { TiTickOutline } from "react-icons/ti";
import MetaData from "../layout/MetaData"
export default function ResetPassword() {
    const [email, setemail] = useState("")
    const { success, message, loading, error } = useSelector(state => state.user)
    console.log(success)
    const dispatch = useDispatch()
    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(passwordreset({ email }))
    }
    return (
        <Fragment>
            <MetaData title="Forgot Password -- Epic Essentials" />
            <main className="forgot-password-main">
                <h1>Forgot Password</h1>
                {loading ? <Loader /> :
                    <section className="forgot-password-box">

                        {!success ?
                            <form onSubmit={formSubmitHandler}>
                                <div className="forgotpassword-email">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email"
                                        placeholder="abc@gmail.com"
                                        name="email" value={email}
                                        onChange={(v) => setemail(v.target.value)} required />
                                </div>
                                <button>Genarate Token</button>
                            </form> :
                            <div>
                                <span><TiTickOutline /> {message}</span>
                            </div>
                        }
                    </section>}
            </main>
        </Fragment>
    )
}