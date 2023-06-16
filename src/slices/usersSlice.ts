import {createSlice, PayloadAction, createAction, createAsyncThunk} from "@reduxjs/toolkit";
import client from '../utils/apiUtils';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await client.get('/user/all');
        return response.data; // Assuming the response data is an array of users
    }
);

// Define the createJob action creator using createAction
export const createJob = createAction<User>('users/createJob');

interface User {
    // Define the user type here
    id: number;
    name: string;
    // ...
}

interface UsersState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: any;
}

const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // Handle the createJob action
            .addCase(createJob, (state, action) => {
                state.users.push(action.payload);
            });
    }
});

export const {createUser} = usersSlice.actions;
export default usersSlice.reducer;
