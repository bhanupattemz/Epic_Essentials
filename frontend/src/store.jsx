import { configureStore } from '@reduxjs/toolkit';
import productReducer  from "./reducers/productReducer/ProductReducer";
import productDetailsReducer from './reducers/productReducer/productDetailsReducer';

const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer
    }
});

export default store;



