import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchEntries = createAsyncThunk(
    'entries/fetchEntries',
    async () => {
        const response = await client.get('/entry/all');
        return response.data;
    }
);

export const addNewEntry = createAsyncThunk(
    'entries/addNewEntry',
    async (initialEntry: AddEntryBody) => {
        const response = await client.post('/entry/add', initialEntry);
        return response.data;
    }
);

export const updateEntry = createAsyncThunk(
    'entries/updateEntry',
    async (initialEntry: UpdateEntryBody) => {
        const response = await client.put('/entry/update', initialEntry);
        return response.data;
    }
);

export const deleteEntry = createAsyncThunk(
    'entries/deleteEntry',
    async (entryId: number) => {
        const response = await client.del(`/entry/delete/${entryId}`);
        if (!response.ok) throw new Error("Failed to delete");
        return entryId;
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
                state.entries = state.entries.concat(action.payload)
            })
            .addCase(fetchEntries.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            });
        builder
            .addCase(addNewEntry.fulfilled, (state, action) => {
                state.entries.push(action.payload);
                state.error = null;
            })
            .addCase(addNewEntry.rejected, (state, action) => {
                state.error = 'failed to add';
            });
        builder
            .addCase(updateEntry.fulfilled, (state, action) => {
                const existingEntry = state.entries.find(entry => entry.id === action.payload.id);
                if (existingEntry) {
                    Object.assign(existingEntry, action.payload);
                }
                state.error = null;
            })
            .addCase(updateEntry.rejected, (state, action) => {
                state.error = 'failed to update';
            });
        builder
            .addCase(deleteEntry.fulfilled, (state, action) => {
                state.entries = state.entries.filter(entry => entry.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteEntry.rejected, (state, action) => {
                state.error = 'failed to delete';
            });
    }
});

export default entriesSlice.reducer;

type UpdateEntryBody = {
    id: number;
    typeId: number;
    description: string;
    hourCount: number;
}

type AddEntryBody = {
    userId: number;
    typeId: number;
    description: string;
    hourCount: number;
}