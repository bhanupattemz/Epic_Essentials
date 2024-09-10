import axios from 'axios';
import {
    CREATE_REVIEW_FAIL,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    USER_REVIEW_FAIL,
    USER_REVIEW_REQUEST,
    USER_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAIL,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS,
    ADMIN_GET_ALL_REVIEWS_FAIL,
    ADMIN_GET_ALL_REVIEWS_REQUEST,
    ADMIN_GET_ALL_REVIEWS_SUCCESS
} from '../constants/Constants';
const axiosInstance = axios.create({
    baseURL: '/api/v1/',
    headers: {
        'Content-Type': 'application/json'
    }
})
const createreview = (params, _id) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REVIEW_REQUEST });
        const response = await axiosInstance.post(`/review/new/${_id}`, params)

        dispatch({
            type: CREATE_REVIEW_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        console.log(error)
        dispatch({
            type: CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const getUserReview = (_id) => async (dispatch) => {
    try {
        dispatch({ type: USER_REVIEW_REQUEST });
        const response = await axiosInstance.get(`/review/${_id}`)

        dispatch({
            type: USER_REVIEW_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: USER_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const getAllUserReview = () => async (dispatch) => {
    try {
        dispatch({ type: USER_REVIEW_REQUEST });
        const response = await axiosInstance.get("/reviews/user")
        dispatch({
            type: USER_REVIEW_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: USER_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const deleteReview = (_id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });
        const response = await axiosInstance.delete(`/review/${_id}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const updatereview = (params, _id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_REVIEW_REQUEST });
        const response = await axiosInstance.put(`/review/${_id}`, params)
        dispatch({
            type: UPDATE_REVIEW_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

//admin

const adminGetAllReviews = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_ALL_REVIEWS_REQUEST });
        const response = await axiosInstance.get(`admin/reviews`)
        dispatch({
            type: ADMIN_GET_ALL_REVIEWS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_GET_ALL_REVIEWS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

const adminfindReviews = (data) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_GET_ALL_REVIEWS_REQUEST });
        const response = await axiosInstance.get(`admin/reviews/find?q=${data}`)
        console.log(response)
        dispatch({
            type: ADMIN_GET_ALL_REVIEWS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_GET_ALL_REVIEWS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};
export { createreview, getUserReview,getAllUserReview, deleteReview, updatereview, adminGetAllReviews, adminfindReviews }