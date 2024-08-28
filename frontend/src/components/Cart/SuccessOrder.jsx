import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./SuccessOrder.css"
import { removeAllCartProduct } from "../../actions/CartAction"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
export default function SuccessOrder() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(removeAllCartProduct())
    }, [removeAllCartProduct, dispatch])
    return (
        <main className='success-order-main'>
            <MetaData title="Order Success -- Epic Essentials" />
            <section>
                <div className='success-order-container'>
                    <div className='success-img'>
                        <img src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1724851733/Epic%20Essentials/nvuggpi5rchnnby43wu5.jpg" alt="payment-success-img" />
                    </div>
                    <h1>Your Order has Placed successfully</h1>
                    <button className='view-order-btn' onClick={() => navigate("/orders")}>View Orders</button>
                </div>
            </section>

        </main>
    )
}