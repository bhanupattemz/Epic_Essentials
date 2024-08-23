import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./reducers/productReducer/ProductReducer";
import productDetailsReducer from './reducers/productReducer/productDetailsReducer';
import userReducer from './reducers/userReducer/UserReducer';
import LoacationReducer from "./reducers/loactionReducer/LoacationReducer"
import CartReducer from './reducers/cartReducer/CartReducer';
import OrderReducer from "./reducers/orderRreducer/orderReducer"
import OrderDetailsReducer from "./reducers/orderRreducer/OrderDetailsReducer"
import ReviewReducer from "./reducers/reviewReducer/ReviewReducer";
import AllOrders from './reducers/orderRreducer/AllOrders';
import AllUsers from "./reducers/userReducer/AllUsersReducer";
import UserDetailsReducer from './reducers/userReducer/UserDetailsReducer';
import AllReviewsReducer from './reducers/reviewReducer/AllReviewsReducer';
const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        currentLocation: LoacationReducer,
        cart: CartReducer,
        order: OrderReducer,
        orderDetails: OrderDetailsReducer,
        review: ReviewReducer,
        allOrders:AllOrders,
        allUsers:AllUsers,
        userDetails:UserDetailsReducer,
        allReviews:AllReviewsReducer
    }
});

export default store;



