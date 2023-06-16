import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchEntryTypes = createAsyncThunk(
    'entryTypes/fetchEntryTypes',
    async () => {
        const response = await client.get('/entry-type/all');
        return response;
    }
);

interface EntryTypesState {
    entryTypes: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

const initialState: EntryTypesState = {
    entryTypes: [],
    status: 'idle',
    error: null
};

const entryTypesSlice = createSlice({
    name: 'entryTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEntryTypes.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchEntryTypes.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.entryTypes = state.entryTypes.concat(action.payload)
            })
            .addCase(fetchEntryTypes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export default entryTypesSlice.reducer;