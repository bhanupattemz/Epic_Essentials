import { Fragment, useState, useRef, useEffect } from "react";
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../actions/UserAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader"
import { useNavigate } from "react-router-dom"
import PersonIcon from '@mui/icons-material/Person';
import "./UpdateProfile.css"

export default function UpdateProfile() {
    const first = useRef(0);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, loading, isauthenticate, user ,isUpdated} = useSelector(state => state.user);
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("");
    const [updateUser, setUpdateUser] = useState({
        name: "",
        email: ""
    });
    const { name, email } = updateUser;

    const updateSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("username", name);
        myForm.set("avatar", avatar);
        myForm.set("email", email);
        dispatch(userUpdate(myForm));
        console.log("Update Form Submitted", myForm);
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
        if (first.current === 0 && user) {
            setUpdateUser({ name: user.username, email: user.email });
            setAvatarPreview(user.avatar[0].url);
            first.current += 1;
        }
        if(isUpdated){
            navigate("/profile")
        }
        if (error) {
            alert.error(error);
        }
    }, [alert, error, user]);

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <main className="update-profile-main">
                        <div className="update-container">
                            <div className="update-box">
                                <h2>Update Profile</h2>
                                <form className="update-form" onSubmit={updateSubmitHandler} encType="multipart/form-data">
                                    <div className="update-username">
                                        <label htmlFor="username"><PersonIcon /></label>
                                        <input type="text" id="username" name="username" value={updateUser.name}
                                            onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })} />
                                    </div>
                                    <div className="update-email">
                                        <label htmlFor="email"><EmailIcon /></label>
                                        <input type="email" id="email" name="email" value={updateUser.email}
                                            onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })} />
                                    </div>
                                    <div className="update-avatar">
                                        <img className="avatar-preview" src={avatarPreview} alt="avatar" />
                                        <input type="file" name="avatar" id="avatar" onChange={handleAvatarChange} />
                                    </div>
                                    <button className="update-button">Update</button>
                                </form>
                            </div>
                        </div>
                    </main>
                </Fragment>
            }
        </Fragment>
    )
}
