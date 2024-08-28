import { createSlice } from '@reduxjs/toolkit';
import {
    ADMIN_GET_ALL_USERS_REQUEST,
    ADMIN_GET_ALL_USERS_FAIL,
    ADMIN_GET_ALL_USERS_SUCCESS,
    ADMIN_DELETE_USER_REQUEST,
    ADMIN_DELETE_USER_FAIL,
    ADMIN_DELETE_USER_SUCCESS,
    CLEAR_ERRORS
} from '../../constants/Constants';

const initialState = {
    users: null,
    loading: false,
    error: null,
    success: null,
    usersCount:0,
    
};

const userSlice = createSlice({
    name: 'allUsers',
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
            .addCase(ADMIN_GET_ALL_USERS_REQUEST, (state) => {
                state.loading = true;
                state.users = [];
            })
            .addCase(ADMIN_GET_ALL_USERS_SUCCESS, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.usersCount=action.payload.users.length;
                state.success=action.payload.success
            })
            .addCase(ADMIN_GET_ALL_USERS_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }) .addCase(ADMIN_DELETE_USER_REQUEST, (state) => {
                state.loading = true;
                state.users = [];
            })
            .addCase(ADMIN_DELETE_USER_SUCCESS, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.usersCount=action.payload.users.length;
                state.success=action.payload.success
            })
            .addCase(ADMIN_DELETE_USER_FAIL, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearErrors,clearSuccess } = userSlice.actions;

export default userSlice.reducer;