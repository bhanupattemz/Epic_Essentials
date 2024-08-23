import { createSlice } from '@reduxjs/toolkit';
import { CURRENT_LOCATION } from '../../constants/Constants';

const initialState = {
    currentLocation: "/"
};

const locationSlice = createSlice({
    name: 'currentLocation',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CURRENT_LOCATION, (state, action) => {
            state.currentLocation = action.payload || "/";
        });
    },
});

export default locationSlice.reducer;
