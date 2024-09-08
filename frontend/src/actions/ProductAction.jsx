import axios from 'axios';
import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ADMIN_CREATE_PRODUCT_FAIL,
    ADMIN_CREATE_PRODUCT_REQUEST,
    ADMIN_CREATE_PRODUCT_SUCCESS,
    ADMIN_UPDATE_PRODUCT_FAIL,
    ADMIN_UPDATE_PRODUCT_REQUEST,
    ADMIN_UPDATE_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_FAIL,
    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS
} from '../constants/Constants';
const axiosInstance = axios.create({
    baseURL: 'https://epic-essentials.onrender.com/api/v1/'
})
axiosInstance.defaults.withCredentials = true;
const getProducts = (params) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });
        const response = await axiosInstance.get('products', { params });
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
        const response = await axiosInstance("products", { params })
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

const adminDeleteProducts = (_id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });
        const response = await axiosInstance.delete(`products/${_id}`)
        dispatch({
            type: ADMIN_DELETE_PRODUCT_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const adminCreateProduct = (params) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_CREATE_PRODUCT_REQUEST });
        const response = await axiosInstance.post(`products`, params)
        dispatch({
            type: ADMIN_CREATE_PRODUCT_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_CREATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const adminUpdateProduct = (params, _id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST });
        const response = await axiosInstance.patch(`products/${_id}`, params)
        dispatch({
            type: ADMIN_UPDATE_PRODUCT_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const adminGetAllProucts=() => async (dispatch) =>{
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });
        const response = await axiosInstance.get('admin/products');
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
}


export { getProducts, getProductDetails, getSearchProducts, adminDeleteProducts, adminCreateProduct, adminUpdateProduct ,adminGetAllProucts}
