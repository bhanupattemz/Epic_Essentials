import React, { useState, useEffect, Fragment } from "react";
import { Country, State, City } from 'country-state-city';
import { FaHome } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { BsPinMap } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";
import "./Address.css"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layout/Loader/Loader"
import { addAddress } from "../../actions/UserAction"
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData";
export default function AddAdress() {
    const alert = useAlert()
    const [address, setAddress] = useState({
        address: "",
        pincode: "",
        country: "",
        state: "",
        city: "",
        phoneNO: ""
    });
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector(state => state.user)
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const addressSubmitHandler = async (e) => {
        e.preventDefault();
        await dispatch(addAddress({
            ...address, state: State.getStateByCodeAndCountry(address.state, address.country).name,
            country: Country.getCountryByCode(address.country).name
        }))
        navigate("/profile")

    };

    const currentLocationSubmitHandler = async (e) => {
        e.preventDefault();
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(async position => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=f657afe4d1fe41ffaaa7b242fda152ce`)
                const data = await response.json()
                const component = data.results[0].components;
                const countryCode = component.country_code.toUpperCase();
                const stateCode = component.state_code.toUpperCase();
                if (position.coords.accuracy < 100) {
                    setAddress({
                        ...address,
                        pincode: component.postcode,
                        state: stateCode,
                        country: countryCode,
                        city: component.city
                    });
                    alert.success("CURRENT LOCATION SUCCESS")
                } else {
                    alert.error("Current Location Failed")
                }


            });
        }
    };

    useEffect(() => {
        if (address.country) {
            if (address.state) {
                setCities(City.getCitiesOfState(address.country, address.state).map((item) => ({
                    name: item.name,
                    isoCode: item.isoCode,
                })));
            }
            setStates(State.getStatesOfCountry(address.country).map((item) => ({
                name: item.name,
                isoCode: item.isoCode,
            })));
        }
    }, [address.country, address.state]);

    return (
        <Fragment>
            <MetaData title="Add Address -- Epic Essentials" />
            {loading ? <Loader /> :
                <main className="add-address-main">
                    <section className="add-address-box">
                        <form onSubmit={addressSubmitHandler} className="add-address-form">
                            <h1>Address</h1>
                            <div>
                                <label htmlFor="address"><FaHome /></label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    id="address"
                                    onChange={e =>
                                        setAddress(address => ({ ...address, address: e.target.value }))
                                    }
                                    value={address.address} required
                                />
                            </div>
                            <div className="pincode-current">

                                <label htmlFor="pincode" ><FaMapLocationDot /></label>
                                <div className="pin-cur-add">
                                    <input
                                        type="number"
                                        placeholder="Pincode"
                                        name="pincode"
                                        id="pincode"
                                        onChange={e =>
                                            setAddress(address => ({ ...address, pincode: e.target.value }))
                                        }
                                        value={address.pincode} required
                                    />
                                    <div onClick={currentLocationSubmitHandler} className="current-location-btn"><BiCurrentLocation /> Current Location</div>

                                </div>


                            </div >

                            <div>
                                <label htmlFor="phoneNO"><FaPhone /></label>
                                <input
                                    type="number"
                                    placeholder="Phone Number"
                                    name="phoneNO"
                                    id="phoneNO"
                                    onChange={e =>
                                        setAddress(address => ({ ...address, phoneNO: e.target.value }))
                                    }
                                    value={address.phoneNO} required
                                />
                            </div>
                            <div>
                                <label htmlFor="country"><FaGlobe /></label>
                                <select required
                                    name="country"
                                    id="country"
                                    placeholder="Country"
                                    onChange={e =>
                                        setAddress(address => ({ ...address, country: e.target.value, state: "", city: "" }))
                                    }
                                    value={address.country}
                                >
                                    <option value="">{address.country ? Country.getCountryByCode(address.country).name : "Select Country"}</option>
                                    {Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="state"><BsPinMap /></label>
                                <select required
                                    name="state"
                                    id="state"
                                    onChange={e =>
                                        setAddress(address => ({ ...address, state: e.target.value, city: "" }))
                                    }
                                    value={address.state}
                                >
                                    <option value="">{address.state ? State.getStateByCodeAndCountry(address.country, address.state) : "Select State"}</option>
                                    {states.map(item => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="city"><FaCity /></label>
                                <select required
                                    name="city"
                                    id="city"
                                    onChange={e =>
                                        setAddress(address => ({ ...address, city: e.target.value }))
                                    }
                                    value={address.city}
                                >
                                    <option value="">{address.city ? address.city : "Select City"}</option>
                                    {cities.map(item => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="save-address-btn">Save Address</button>
                        </form>
                    </section>
                </main>
            }

        </Fragment>
    );
}
