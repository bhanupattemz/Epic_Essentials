import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    CURRENT_USER_FAIL,
    CURRENT_USER_REQUEST,
    CURRENT_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_ADDRESS_FAIL,
    USER_ADDRESS_REQUEST,
    USER_ADDRESS_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    ADMIN_GET_ALL_USERS_FAIL,
    ADMIN_GET_ALL_USERS_REQUEST,
    ADMIN_GET_ALL_USERS_SUCCESS,
    ADMIN_DELETE_USER_FAIL,
    ADMIN_DELETE_USER_REQUEST,
    ADMIN_DELETE_USER_SUCCESS,
    ADMIN_GET_USER_FAIL,
    ADMIN_GET_USER_REQUEST,
    ADMIN_GET_USER_SUCCESS,
    CLEAR_ERRORS
} from '../constants/Constants';
import axios from 'axios';
import { useParams } from "react-router-dom"
const axiosInstance = axios.create({
    baseURL: '/api/v1/'
});
axiosInstance.defaults.withCredentials = true;
// User login action
const userLogin = (params) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const response = await axiosInstance.post('login', params);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

// User registration action
const userRegister = (params) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const response = await axiosInstance.post('register', params);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};


const getCurrentUser = () => async (dispatch) => {
    try {
        dispatch({ type: CURRENT_USER_REQUEST });
        const response = await axiosInstance.get('user');

        dispatch({
            type: CURRENT_USER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CURRENT_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
const getIsUserLogIn = () => async (dispatch) => {
    try {
        dispatch({ type: CURRENT_USER_REQUEST });
        const response = await axiosInstance.get('isuserin');

        dispatch({
            type: CURRENT_USER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CURRENT_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};



const userLogout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_REQUEST })
        const response = await axiosInstance.post('logout');
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};
const userUpdate = (params) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const response = await axiosInstance.put('user', params);
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const passwordUpdate = (params, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const response = await axiosInstance.put(`password/update/${id}`, params);
        console.log(`Response:${response.data}`)
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const deleteUser = () => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const response = await axiosInstance.delete(`user`);
        console.log(`Response:${response.data}`)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const passwordreset = (params) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const response = await axiosInstance.post(`password/forgot`, params = { email: params.email });
        console.log(`Response:${response.data}`)
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const changePassword = (params, token) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const response = await axiosInstance.put(`password/forgot/${token}`, params = { ...params });
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const addAddress = (params) => async (dispatch) => {
    try {
        dispatch({ type: USER_ADDRESS_REQUEST });
        const response = await axiosInstance.post(`user/address`, params);
        console.log(`Response:${response.data}`)
        dispatch({
            type: USER_ADDRESS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: USER_ADDRESS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const updateAddress = (params, _id) => async (dispatch) => {
    try {
        dispatch({ type: USER_ADDRESS_REQUEST });
        const response = await axiosInstance.put(`user/address/${_id}`, params);
        console.log(`Response:${response.data}`)
        dispatch({
            type: USER_ADDRESS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: USER_ADDRESS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
const deleteAddress = (_id) => async (dispatch) => {
    try {
        dispatch({ type: USER_ADDRESS_REQUEST });
        const response = await axiosInstance.delete(`user/address/${_id}`);
        console.log(`Response:${response.data}`)
        dispatch({
            type: USER_ADDRESS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: USER_ADDRESS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//admin
const adminGetAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_ALL_USERS_REQUEST });
        const response = await axiosInstance.get('admin/users');

        dispatch({
            type: ADMIN_GET_ALL_USERS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_GET_ALL_USERS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const adminDeleteUser = (_id, params) => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_DELETE_USER_REQUEST });
        console.log(params)
        const response = await axiosInstance.delete(`admin/users/${_id}`, {
            data: params
        });

        dispatch({
            type: ADMIN_DELETE_USER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const adminGetUserDetails = (_id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_USER_REQUEST });
        const response = await axiosInstance.get(`admin/users/${_id}`);

        dispatch({
            type: ADMIN_GET_USER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_GET_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};


const adminUpdateUserDetails = (_id, params) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_USER_REQUEST });
        const response = await axiosInstance.put(`admin/users/${_id}`, params);

        dispatch({
            type: ADMIN_GET_USER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_GET_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const adminBlockAndUnblockUserDetails = (_id, params) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_USER_REQUEST });
        const response = await axiosInstance.patch(`admin/users/${_id}`, params);

        dispatch({
            type: ADMIN_GET_USER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_GET_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};





const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export {
    userLogin, userRegister, getCurrentUser, userLogout, addAddress, updateAddress, deleteAddress, getIsUserLogIn,
    userUpdate, passwordUpdate, deleteUser, passwordreset,
    changePassword, adminGetAllUsers, adminDeleteUser, adminGetUserDetails,
    adminUpdateUserDetails, adminBlockAndUnblockUserDetails,
    clearErrors
};
