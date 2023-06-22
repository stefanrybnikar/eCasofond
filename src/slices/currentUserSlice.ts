import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./usersSlice";
import client from '../utils/apiUtils'
import { getUsername } from "../utils/session";

export const fetchCurrentUser = createAsyncThunk(
    'currentUser/fetchCurrentUser',
    async () => {
        const username = getUsername();
        if (!username) return null;
        const response = await client.get(`/user/username/${username}`);
        return response.data;
    }
);

const initialState : {user : User|null} ={
    user: null
};

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        clearCurrentUser: (state) => {
            state.user = null;
        } 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    }
});

export const { clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
