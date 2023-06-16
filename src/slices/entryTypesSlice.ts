import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchEntryTypes = createAsyncThunk(
    'entryTypes/fetchEntryTypes',
    async () => {
        const response = await client.get('/entrytype/all');
        return response.data;
    }
);

export const addNewEntryType = createAsyncThunk(
    'entryTypes/addNewEntryType',
    async (initialEntryType: AddEntryTypeBody) => {
        const response = await client.post('/entrytype/add', initialEntryType);
        return response.data;
    }
);

export const updateEntryType = createAsyncThunk(
    'entryTypes/updateEntryType',
    async (initialEntryType: UpdateEntryTypeBody) => {
        const response = await client.put('/entrytype/update', initialEntryType);
        return response.data;
    }
);

export const deleteEntryType = createAsyncThunk(
    'entryTypes/deleteEntryType',
    async (entryTypeId: number) => {
        const response = await client.del(`/entrytype/delete/${entryTypeId}`);
        if (!response.ok) throw new Error("Failed to delete");
        return entryTypeId;
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
            });
        builder
            .addCase(addNewEntryType.fulfilled, (state, action) => {
                state.entryTypes.push(action.payload);
                state.error = null;
            })
            .addCase(addNewEntryType.rejected, (state, action) => {
                state.error = 'failed to add';
            });
        builder
            .addCase(updateEntryType.fulfilled, (state, action) => {
                const existingEntryType = state.entryTypes.find(entryType => entryType.id === action.payload.id);
                if (existingEntryType) {
                    Object.assign(existingEntryType, action.payload);
                }
                state.error = null;
            })
            .addCase(updateEntryType.rejected, (state, action) => {
                state.error = 'failed to update';
            });
        builder
            .addCase(deleteEntryType.fulfilled, (state, action) => {
                state.entryTypes = state.entryTypes.filter(entryType => entryType.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteEntryType.rejected, (state, action) => {
                state.error = 'failed to delete';
            });
        
    }
});

export default entryTypesSlice.reducer;

type UpdateEntryTypeBody = {
    id: number;
    name: string;
}

type AddEntryTypeBody = {
    name: string;
}