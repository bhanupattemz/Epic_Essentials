import "./Cart.css"
import { useNavigate } from "react-router-dom"
export default function EmptyCart() {
    const navigate = useNavigate()
    return (
        <main className="emptycart-main">
            <div className="emptycart">
                <img
                    src="https://res.cloudinary.com/dmvxvzb5n/image/upload/v1722165665/Epic%20Essentials/w39ktwrpldqkhgrfnnmf.jpg"
                    alt="empty-cart" />
                <h3>Your cart is empty!</h3>
                <p>Add items to it now.</p>
                <button onClick={()=>navigate("/products")}>Show now</button>
            </div>
        </main>
    )
}