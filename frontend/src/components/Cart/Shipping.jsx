import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Shipping.css";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import AddressShow from "./AddressShow";
import Loader from "../layout/Loader/Loader";
import { getCurrentUser } from "../../actions/UserAction";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@mui/icons-material/Add';
export default function Shipping() {
    const [address, setAddress] = useState({});
    const navigate = useNavigate();
    const { user, loading, error } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const addressSubmitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem("address", JSON.stringify(address));
        navigate("/order/confirm");
    };
    const changehandler = (e) => {
        setAddress(JSON.parse(e.target.value))
    }
    useEffect(() => {
        if (!user) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, user]);

    return (
        <Fragment>
            <main className="shipping-main">
                <Stepper stepNo={0} />
                {loading ? <Loader /> : (
                    <section className="shipping-box">
                        <div className="shipping-page-add-address" onClick={() => navigate("/address/new")}>
                            <p><AddIcon /> ADD NEW ADDRESS</p>
                        </div>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="address" name="address" value={JSON.stringify(address)} onChange={changehandler} className="shipping-radio-box">
                                {user?.shippingInfo?.length ? (
                                    user.shippingInfo.map((address, index) => (
                                        <FormControlLabel value={JSON.stringify(address)} control={<Radio />}
                                            label={<AddressShow key={index} username={user.username} address={address} />} />

                                    ))
                                ) : (
                                    <p>No shipping information available.</p>
                                )}

                            </RadioGroup>
                            {user?.shippingInfo?.length>0 && <button onClick={addressSubmitHandler} className="shipping-page-btn">Delivery Here</button> }
                           
                        </FormControl>

                    </section>
                )}
            </main>
        </Fragment>
    );
}
