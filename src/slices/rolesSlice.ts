import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchRoles = createAsyncThunk(
    'roles/fetchRoles',
    async () => {
        const response = await client.get('/role/all');
        return response.data;
    }
);

interface RolesState {
    roles: Role[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
};

const initialState: RolesState = {
    roles: [],
    status: 'idle',
    error: null
};

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.roles = (action.payload ? action.payload : [])
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            });
    }
});

export default rolesSlice.reducer;

type Role = {
    id: number;
    name: string;
    level: number | null;
    write: boolean | null;
};
