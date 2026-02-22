import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Get user from localStorage
const userFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userInfo: userFromStorage,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

const API_URL = '/api/users/';

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(API_URL + 'login', userData);
            if (response.data) {
                localStorage.setItem('userInfo', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Register user
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(API_URL, userData);
            if (response.data) {
                localStorage.setItem('userInfo', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('userInfo');
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userInfo = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.userInfo = null;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userInfo = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.userInfo = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.userInfo = null;
            });
    },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
