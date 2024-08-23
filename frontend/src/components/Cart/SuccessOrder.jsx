import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./SuccessOrder.css"
import {removeAllCartProduct} from "../../actions/CartAction"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import React,{useEffect} from 'react';
export default function SuccessOrder() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(removeAllCartProduct())
    },[removeAllCartProduct,dispatch])
    return (
        <main className='success-order-main'>
            <div className='success-order-container'>
                <div className='success-icon'>
                    <CheckCircleIcon />
                </div>
                <h1>Your Order has Placed successfully</h1>
                <button className='view-order-btn'onClick={()=>navigate("/orders")}>View Orders</button>
            </div>
        </main>
    )
}