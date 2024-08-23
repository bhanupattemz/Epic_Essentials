import "./CartItems.css"
import React, { useState, useEffect, Fragment } from "react"
import { removeCartProduct, getCartProducts } from "../../actions/CartAction"
import { useDispatch } from "react-redux"
import { addCartProducts } from "../../actions/CartAction"
export default function CartItems({ product }) {
    const [quantity, setquantity] = useState(product.quantity)
    const dispatch = useDispatch()
    const removeProductHandler = (e) => {
        e.preventDefault();
        dispatch(removeCartProduct(product._id))
        dispatch(getCartProducts())
    }
    const quantityhandler = async () => {
        await dispatch(addCartProducts(product.product._id, quantity - product.quantity))
        dispatch(getCartProducts())
    }
    const getaddbutton = () => {
        if (quantity > product.quantity) {
            return <button onClick={quantityhandler}>ADD {quantity - product.quantity} MORE</button>
        }
        if (quantity < product.quantity) {
            return <button onClick={quantityhandler}>Remove {product.quantity - quantity}</button>
        }

    }

    return (
        <Fragment>
            {product.product.images && <div className="cartitem">
                <div className="cartitem-product">
                    <div className="cart-item-img">
                        <img className="cart-img" src={product.product.images[0].url} alt="product-img" />
                        <form className="cart-item-quantity-form" >
                            <button onClick={(e) => {
                                e.preventDefault()
                                setquantity((quantity) => quantity < 2 ? quantity : quantity - 1)
                            }}>-</button>
                            <input type="text" value={quantity} id="quantity" disabled />
                            <button onClick={(e) => {
                                e.preventDefault()
                                setquantity((quantity) => quantity >= 10 ? quantity : quantity + 1) 
                            }}>+</button>
                        </form>
                    </div>

                    <div className="cart-item-content">
                        <h4>{product.product.name}</h4>
                        <p>{product.product.id}</p>
                        <p>{product.product.discription}</p>
                        <p>Price: <span>₹{quantity * product.product.price}</span></p>
                    </div>

                </div>
                <div className="cart-item-add-remove-btn">
                    <button onClick={removeProductHandler} style={{width:quantity===product.quantity&&"100%"}}>REMOVE</button>
                    {getaddbutton()}
                </div>
            </div>}
        </Fragment>
    )
}