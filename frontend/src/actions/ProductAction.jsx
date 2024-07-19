import axios from 'axios';
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS
} from '../constants/Constants';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
})
const getProducts = (params) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });
        const response = await axiosInstance.get('products',{params});
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_DETAILS_REQUEST });
        const response = await axiosInstance.get(`products/${id}`);
        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
const getSearchProducts = (params) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });
        const response = await axiosInstance("products", {  params })
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export { getProducts, getProductDetails, getSearchProducts }
