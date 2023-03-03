import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        process: {
            isFetching: false,
            error: false,
        },
        account: {
            access_token: null,
            refresh_toke: null,
            username: null,
            email: null,
            role: null,
            image: null,
        },
        isAuthenticated: false,
    },
    reducers: {
        getLoginStart: (state) => {
            state.process.isFetching = true;
        },
        getLoginSuccess: (state, action) => {
            state.process.isFetching = false;
            state.process.error = false;
            state.account = action.payload;
            state.isAuthenticated = true;
        },
        getLoginFailed: (state) => {
            state.process.error = true;
            state.process.isFetching = false;
            state.isAuthenticated = false;
        },
        getUser: (state, action) => {
            state.account = action.payload;
        }
    }
})

export const {
    getLoginStart,
    getLoginSuccess,
    getLoginFailed
} = userSlice.actions;

export default userSlice.reducer;