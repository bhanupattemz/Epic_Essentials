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
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateAddress } from "../../actions/UserAction"
import Loader from "../layout/Loader/Loader";
export default function UpdateAddress() {
    let oldAddress = null
    const dispatch = useDispatch()
    const [address, setAddress] = useState({
        address: "",
        pincode: "",
        country: "",
        state: "",
        city: "",
        phoneNO: ""
    });
    const { _id } = useParams()
    const navigate = useNavigate()
    const { user, loading } = useSelector(state => state.user)
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const addressSubmitHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateAddress({
            ...address, state: State.getStateByCodeAndCountry(address.state, address.country).name,
            country: Country.getCountryByCode(address.country).name
        }, _id))
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
                setAddress({
                    ...address,
                    pincode: component.postcode,
                    state: stateCode,
                    country: countryCode,
                    city: component.city
                });
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
    useEffect(() => {
        if (!oldAddress) {
            user.shippingInfo && user.shippingInfo.forEach(addr => {
                if (addr._id === _id) {
                    oldAddress = addr
                }
            })
            if (oldAddress) {
                const country = Country.getAllCountries().find(
                    (country) => country.name.toLowerCase() === oldAddress.country.toLowerCase()
                ).isoCode;
                const state = State.getStatesOfCountry(country).find(
                    (state) => state.name.toLowerCase() === oldAddress.state.toLowerCase()
                ).isoCode;

                setAddress(addr => ({ ...addr, ...oldAddress, country, state }))
            }
        }
    }, [user])
    return (
        <Fragment>
            {loading ? <Loader /> :
                <main className="update-address-main">
                    <section className="update-address-box">
                        <form onSubmit={addressSubmitHandler} className="update-address-form">
                            <h2>Update Address</h2>
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
                                        type="text"
                                        placeholder="Pincode"
                                        name="pincode"
                                        id="pincode"
                                        onChange={e =>
                                            setAddress(address => ({ ...address, pincode: e.target.value }))
                                        }
                                        value={address.pincode} required
                                    />
                                    <a onClick={currentLocationSubmitHandler} className="current-location-btn"><BiCurrentLocation /> Current Location</a>

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
                                <select
                                    name="country"
                                    id="country"
                                    placeholder="Country"
                                    onChange={e =>
                                        setAddress(address => ({ ...address, country: e.target.value, state: "", city: "" }))
                                    }
                                    value={address.country} required
                                >
                                    <option value="">{address.country ? Country.getCountryByCode(address.country).name : "Select Country"}</option>
                                    {Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="state"><BsPinMap /></label>
                                <select
                                    name="state"
                                    id="state"
                                    onChange={e =>
                                        setAddress(address => ({ ...address, state: e.target.value, city: "" }))
                                    }
                                    value={address.state} required
                                >
                                    <option value="">{address.state ? State.getStateByCodeAndCountry(address.country, address.state) : "Select State"}</option>
                                    {states.map(item => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="city"><FaCity /></label>
                                <select
                                    name="city"
                                    id="city"
                                    onChange={e =>
                                        setAddress(address => ({ ...address, city: e.target.value }))
                                    }
                                    value={address.city} required
                                >
                                    <option value="">{address.city ? address.city : "Select City"}</option>
                                    {cities.map(item => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="save-address-btn">Update Address</button>
                        </form>
                    </section>
                </main>
            }

        </Fragment>
    );
}
