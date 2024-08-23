import "./LoginSignup.css";
import { Fragment, useState, useRef, useEffect } from "react";
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader"
import { useNavigate } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import { clearErrors } from "../../reducers/userReducer/UserReducer"
export default function LoginSignup() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate()
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const { currentLocation } = useSelector(state => state.currentLocation)
    const [loginUsername, setLoginUsername] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("https://res.cloudinary.com/dmvxvzb5n/image/upload/v1721047699/Epic%20Essentials/pjlmvwy41tdhblpskhnj.png");
    const [user, setUser] = useState({
        name: "",
        password: "",
        email: ""
    });
    const { name, password, email } = user;
    const [loginPassword, setLoginPassword] = useState("");
    const { error, loading, isauthenticate } = useSelector(state => state.user);

    const loginSubmitHandler = async (e) => {
        e.preventDefault();
        await dispatch(userLogin({ username: loginUsername, password: loginPassword }));
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    };

    const registerSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("username", name);
        myForm.set("avatar", avatar);
        myForm.set("email", email);
        myForm.set("password", password);
        dispatch(userRegister(myForm))
        console.log("Register Form Submitted", myForm);
    };

    const switchTab = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
            switcherTab.current.classList.remove("shiftToNeutral");
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (isauthenticate) {
            navigate(currentLocation)
        }
    }, [alert, error, loading, isauthenticate]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <main className="loginsignup-main">
                    <div className="LoginSignup-container">
                        <div className="loginSignup-box">
                            <div>
                                <div className="loginSignup-toggle">
                                    <p onClick={(e) => switchTab(e, "login")}>Login</p>
                                    <p onClick={(e) => switchTab(e, "register")}>Register</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="login-form" onSubmit={loginSubmitHandler} ref={loginTab}>
                                <div className="login-username">
                                    <label htmlFor="username"><PersonIcon /></label>
                                    <input type="text" id="username" name="username" placeholder="Username"
                                        onChange={(e) => setLoginUsername(e.target.value)} required />
                                </div>
                                <div className="login-password">
                                    <label htmlFor="password"><LockOpenIcon /></label>
                                    <input type="password" name="password" id="password" placeholder="*********"
                                        onChange={(e) => setLoginPassword(e.target.value)} required />
                                </div>
                                <a href="/password/forgot">Forgot Password?</a>
                                <button className="login-button">Login</button>
                            </form>
                            <form className="register-form" onSubmit={registerSubmitHandler} ref={registerTab} encType="multipart/form-data">
                                <div className="register-username">
                                    <label htmlFor="username"><PersonIcon /></label>
                                    <input type="username" id="username" name="username" placeholder="Username"
                                        onChange={(e) => setUser({ ...user, name: e.target.value })} required />
                                </div>
                                <div className="register-email">
                                    <label htmlFor="email"><EmailIcon /></label>
                                    <input type="email" id="email" name="email" placeholder="abc@gmail.com"
                                        onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                                </div>
                                <div className="register-password">
                                    <label htmlFor="password"><LockOpenIcon /></label>
                                    <input type="password" name="password" id="password" placeholder="*********"
                                        onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                                </div>
                                <div className="register-avatar">
                                    <img src={avatarPreview} alt="avatar" />
                                    <input type="file" name="avatar" id="avatar" onChange={handleAvatarChange} multiple />
                                </div>
                                <button className="register-button">Register</button>
                            </form>
                        </div>
                    </div>
                </main>}
        </Fragment>
    );
}
