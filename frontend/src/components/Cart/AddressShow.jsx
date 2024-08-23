import "./Shipping.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteAddress } from "../../actions/UserAction"
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState } from "react";
export default function AddressShow({ username, address }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showEdits, setShowEdits] = useState(false)
    return (
        <div className="showAddress-container" onClick={() => setShowEdits(false)}>
            <div className="showAddress-heading">
                <div>
                    <h3>{username} </h3> <p>{address.phoneNO}</p>
                </div>
                <div onClick={(event) => {
                    event.stopPropagation();
                    setShowEdits(val => !val)

                }} className="addressshow-verticaldots">
                    {!showEdits &&
                        <div>
                            <BsThreeDotsVertical />
                        </div>}


                    {showEdits &&
                        <div className="showAdress-edit-delete" >
                            <p onClick={() => navigate(`/address/update/${address._id}`)}>Edit</p>
                            <p onClick={() => dispatch(deleteAddress(address._id))}>Delete</p>
                        </div>}
                </div>



            </div>
            <div className="showAddress-body">
                <p>{address.address} {address.city} {address.state} {address.country}-{address.pincode}</p>
            </div>
        </div>
    )
}