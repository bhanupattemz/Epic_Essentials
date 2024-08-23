import { createSlice } from '@reduxjs/toolkit';
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
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialreviewState = {
    review: null,
    loading: false,
    error: null,
    success:false
   
};

// review Slice
const reviewSlice = createSlice({
    name: 'review',
    initialState: initialreviewState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CREATE_REVIEW_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(CREATE_REVIEW_SUCCESS, (state, action) => {
                state.loading = false;
                state.review = action.payload; 
                state.success=true   
            })
            .addCase(CREATE_REVIEW_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(USER_REVIEW_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(USER_REVIEW_SUCCESS, (state, action) => {
                state.loading = false;
                state.review = action.payload.review; 
                state.success=true   
            })
            .addCase(USER_REVIEW_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(DELETE_REVIEW_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(DELETE_REVIEW_SUCCESS, (state, action) => {
                state.loading = false;
                state.review = null; 
                state.success=true   
            })
            .addCase(DELETE_REVIEW_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(UPDATE_REVIEW_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(UPDATE_REVIEW_SUCCESS, (state, action) => {
                state.loading = false;
                state.review = action.payload.review; 
                state.success=true   
            })
            .addCase(UPDATE_REVIEW_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearErrors } = reviewSlice.actions;

export default reviewSlice.reducer;

