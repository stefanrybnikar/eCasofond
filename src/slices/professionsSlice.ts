import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchProfessions = createAsyncThunk(
    'professions/fetchProfessions',
    async () => {
        const response = await client.get('/profession/all');
        return response;
    }
);

interface ProfessionsState {
    professions: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

const initialState: ProfessionsState = {
    professions: [],
    status: 'idle',
    error: null
};

const professionsSlice = createSlice({
    name: 'professions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfessions.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProfessions.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.professions = state.professions.concat(action.payload)
            })
            .addCase(fetchProfessions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export default professionsSlice.reducer;
