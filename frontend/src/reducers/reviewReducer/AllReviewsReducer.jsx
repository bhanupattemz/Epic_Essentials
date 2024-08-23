import { createSlice } from '@reduxjs/toolkit';
import {
    ADMIN_GET_ALL_REVIEWS_REQUEST,
    ADMIN_GET_ALL_REVIEWS_FAIL,
    ADMIN_GET_ALL_REVIEWS_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialState = {
    reviews: null,
    loading: false,
    error: null,
    success: false,
    reviewsCount: 0

};

// review Slice
const allReviewsSlice = createSlice({
    name: 'allReviews',
    initialState: initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ADMIN_GET_ALL_REVIEWS_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(ADMIN_GET_ALL_REVIEWS_SUCCESS, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.reviews;
                state.success = true
                state.reviewsCount = action.payload.reviews.length
            })
            .addCase(ADMIN_GET_ALL_REVIEWS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearErrors } = allReviewsSlice.actions;

export default allReviewsSlice.reducer;

