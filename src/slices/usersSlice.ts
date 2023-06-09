import {createSlice, PayloadAction, createAction, createAsyncThunk} from "@reduxjs/toolkit";
import client from '../utils/apiUtils';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await client.get('/user/all');
        return response.data; // Assuming the response data is an array of users
    }
);

export const addNewUser = createAsyncThunk(
    'users/addNewUser',
    async (initialUser: AddUserBody) => {
        const response = await client.post('/user/add', initialUser);
        return response.data;
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async (initialUser: UpdateUserBody) => {
        const response = await client.put('/user/update', initialUser);
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId: number) => {
        const response = await client.del(`/user/delete/${userId}`);
        if (!response.ok) throw new Error("failed to delete")
        return userId;
    }
);

interface UsersState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: any;
};

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
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = (action.payload ? action.payload : [])
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        builder
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
                state.error = null;
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.error = 'failed to add';
            });
        builder
            .addCase(updateUser.fulfilled, (state, action) => {
                const existingUser = state.users.find(user => user.id === action.payload.id);
                if (existingUser) {
                    Object.assign(existingUser, action.payload);
                }
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = 'failed to update';
            });
        builder
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload)
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = 'failed to delete';
            });
    }
});

export default usersSlice.reducer;

type UpdateUserBody = {
    id: number;
    displayName: string;
    email: string;
    username: string;
    oldPassword: string;
    password: string;
};

type AddUserBody = {
    companyId : number | null;
    roleId: number;
    professionId: number | null;
    displayName: string;
    email: string;
    username: string;
    password: string;
};

export type User = {
    id: number;
    username: string;
    email: string;
    displayName: string;
    companyId: number | null;
    roleId: number;
    professionTypeId: number | null;
};
