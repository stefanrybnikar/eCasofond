import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await client.get('/user/all');
        return response;
    }
);

interface UsersState {
    users: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users = state.users.concat(action.payload)
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export default usersSlice.reducer;
