import { createSlice } from '@reduxjs/toolkit';
import {
    ADMIN_GET_USER_REQUEST,
    ADMIN_GET_USER_FAIL,
    ADMIN_GET_USER_SUCCESS,
    ADMIN_UPDATE_USER_REQUEST,
    ADMIN_UPDATE_USER_FAIL,
    ADMIN_UPDATE_USER_SUCCESS,
    ADMIN_UPDATE_ISBLOCKED_USER_REQUEST,
    ADMIN_UPDATE_ISBLOCKED_USER_FAIL,
    ADMIN_UPDATE_ISBLOCKED_USER_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialState = {
    user: null,
    loading: false,
    error: null,
    success: false,
};

const userSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ADMIN_GET_USER_REQUEST, (state) => {
                state.loading = true;
                state.user = {};
            })
            .addCase(ADMIN_GET_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(ADMIN_GET_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(ADMIN_UPDATE_USER_REQUEST, (state) => {
                state.loading = true;
                state.user = {};
            })
            .addCase(ADMIN_UPDATE_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(ADMIN_UPDATE_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(ADMIN_UPDATE_ISBLOCKED_USER_REQUEST, (state) => {
                state.loading = true;
                state.user = {};
            })
            .addCase(ADMIN_UPDATE_ISBLOCKED_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(ADMIN_UPDATE_ISBLOCKED_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearErrors,clearSuccess } = userSlice.actions;

export default userSlice.reducer;