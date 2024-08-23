import { createSlice } from '@reduxjs/toolkit';
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
    USER_ADDRESS_FAIL,
    USER_ADDRESS_REQUEST,
    USER_ADDRESS_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialState = {
    user:null,
    loading: false,
    error: null,
    isauthenticate:false,
    isUpdated:false,
    message:"",
    isPasswordUpdated:false,
    success:false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(LOGIN_REQUEST, (state) => {
                state.loading = true;
                state.user = null;
            })
            .addCase(LOGIN_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isauthenticate=action.payload.isauthenticate
            })
            .addCase(LOGIN_FAIL, (state, action) => {
                state.loading = false;
                state.user=null
                state.error = action.payload;
            })
            .addCase(REGISTER_REQUEST, (state) => {
                state.loading = true;
                state.user = null;
            })
            .addCase(REGISTER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isauthenticate=action.payload.isauthenticate
            })
            .addCase(REGISTER_FAIL, (state, action) => {
                state.loading = false;
                state.user=null
                state.error = action.payload;
            }).addCase(CURRENT_USER_REQUEST, (state) => {
                state.loading = true;
                state.user = null;
            })
            .addCase(CURRENT_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isauthenticate=action.payload.isauthenticate 
            })
            .addCase(CURRENT_USER_FAIL, (state, action) => {
                state.loading = false;
                state.user=null
            }).addCase(LOGOUT_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(LOGOUT_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isauthenticate=false
            })
            .addCase(LOGOUT_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(UPDATE_USER_REQUEST, (state) => {
                state.isUpdated=false;
                state.loading = true;
            })
            .addCase(UPDATE_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isUpdated=true
            })
            .addCase(UPDATE_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error=action.payload
                state.isUpdated=false
            }).addCase(UPDATE_PASSWORD_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(UPDATE_PASSWORD_SUCCESS, (state, action) => {
                state.loading = false;
                state.message = action.payload;
                state.isPasswordUpdated=true;
            })
            .addCase(UPDATE_PASSWORD_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(DELETE_USER_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(DELETE_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.user = null;
                state.message=action.payload.message;
                state.isauthenticate=false;
            })
            .addCase(DELETE_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error=action.payload
            }).addCase(FORGOT_PASSWORD_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(FORGOT_PASSWORD_SUCCESS, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.success=true
            })
            .addCase(FORGOT_PASSWORD_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(RESET_PASSWORD_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(RESET_PASSWORD_SUCCESS, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.success=true
            })
            .addCase(RESET_PASSWORD_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(USER_ADDRESS_REQUEST, (state) => {
                state.loading = true;
            })
            .addCase(USER_ADDRESS_SUCCESS, (state, action) => {
                state.loading = false;
                state.user=action.payload.user
                state.success=true
            })
            .addCase(USER_ADDRESS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;