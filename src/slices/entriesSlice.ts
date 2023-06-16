// entriesSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchEntries = createAsyncThunk(
    'entries/fetchEntries',
    async () => {
        const response = await client.get('/entry/all');
        return response;
    }
);

interface EntriesState {
    entries: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

const initialState: EntriesState = {
    entries: [],
    status: 'idle',
    error: null
};

const entriesSlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEntries.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchEntries.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.entries = action.payload
            })
            .addCase(fetchEntries.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export default entriesSlice.reducer;
