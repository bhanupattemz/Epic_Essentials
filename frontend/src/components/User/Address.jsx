import React, { useEffect, Fragment, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "../layout/Loader/Loader"
import MetaData from "../layout/MetaData"
import AddressShow from "../Cart/AddressShow"
import SideBar from "./SideBar"
import "./Address.css"
import AddIcon from '@mui/icons-material/Add';
export default function Profile() {
    const navigate = useNavigate()
    const { user, loading } = useSelector(state => state.user)
    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <main className="profile-page-main">
                        <MetaData title={`Manage Address --Epic Essentials`} />
                        <section className="address-page-side-bar">
                            <SideBar curent_place={"address"} />
                        </section>
                        <section className="address-page-content">
                            <div>
                                <h2>Manage Addresses</h2>
                            </div>
                            <div className="address-page-content-information">
                                <div className="address-page-add-address" onClick={()=>navigate("/address/new")}>
                                    <p><AddIcon /> ADD NEW ADDRESS</p>
                                </div>
                                {user.shippingInfo.length > 0 ?
                                    <div className="address-container">
                                        {user.shippingInfo.map((addr) => {
                                            return (
                                                <AddressShow username={user.username} address={addr} />
                                            )
                                        })}
                                        <h3>

                                        </h3>
                                    </div>
                                    : <h3>No Addresses Found</h3>}

                            </div>

                        </section >

                    </main>
                </Fragment>
            }

        </Fragment>
    )
}