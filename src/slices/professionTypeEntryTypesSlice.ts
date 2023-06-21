import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchProfessionTypeEntryTypes = createAsyncThunk(
    'professionTypeEntryTypes/fetchProfessionTypeEntryTypes',
    async () => {
        const response = await client.get('/professiontypeentrytype/all');
        return response.data;
    }
);

export const addNewProfessionTypeEntryType = createAsyncThunk(
    'professionTypeEntryTypes/addNewProfessionTypeEntryType',
    async (initialProfessionTypeEntryType: AddProfessionTypeEntryTypeBody) => {
        console.log(initialProfessionTypeEntryType, "AAAAAAAAAAAAa")
        const response = await client.post('/professiontypeentrytype/add', initialProfessionTypeEntryType);
        
        console.log(response, "AAAAAAAAAAAAa")
        return response.data;
    }
);

export const updateProfessionTypeEntryType = createAsyncThunk(
    'professionTypeEntryTypes/updateProfessionTypeEntryType',
    async (initialProfessionTypeEntryType: UpdateProfessionTypeEntryTypeBody) => {
        const response = await client.put('/professiontypeentrytype/update', initialProfessionTypeEntryType);
        return response.data;
    }
);

export const deleteProfessionTypeEntryType = createAsyncThunk(
    'professionTypeEntryTypes/deleteProfessionTypeEntryType',
    async (professionTypeEntryTypeId: number) => {
        const response = await client.del(`/professiontypeentrytype/delete/${professionTypeEntryTypeId}`);
        if (!response.ok) throw new Error("Failed to delete");
        return professionTypeEntryTypeId;
    }
);

interface ProfessionTypeEntryTypesState {
    professionTypeEntryTypes: ProfessionTypeEntryType[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
};

const initialState: ProfessionTypeEntryTypesState = {
    professionTypeEntryTypes: [],
    status: 'idle',
    error: null
};

const professionTypeEntryTypesSlice = createSlice({
    name: 'professionTypeEntryTypes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfessionTypeEntryTypes.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchProfessionTypeEntryTypes.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.professionTypeEntryTypes = (action.payload ? action.payload : [])
            })
            .addCase(fetchProfessionTypeEntryTypes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            });
        builder
            .addCase(addNewProfessionTypeEntryType.fulfilled, (state, action) => {
                state.professionTypeEntryTypes.push(action.payload);
                state.error = null;
            })
            .addCase(addNewProfessionTypeEntryType.rejected, (state, action) => {
                state.error = 'failed to add';
            });
        builder
            .addCase(updateProfessionTypeEntryType.fulfilled, (state, action) => {
                const existingProfessionTypeEntryType = state.professionTypeEntryTypes.find(professionTypeEntryType => professionTypeEntryType.id === action.payload.id);
                if (existingProfessionTypeEntryType) {
                    Object.assign(existingProfessionTypeEntryType, action.payload);
                }
                state.error = null;
            })
            .addCase(updateProfessionTypeEntryType.rejected, (state, action) => {
                state.error = 'failed to update';
            });
        builder
            .addCase(deleteProfessionTypeEntryType.fulfilled, (state, action) => {
                state.professionTypeEntryTypes = state.professionTypeEntryTypes.filter(professionTypeEntryType => professionTypeEntryType.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteProfessionTypeEntryType.rejected, (state, action) => {
                state.error = 'failed to delete';
            });
    }
});

export default professionTypeEntryTypesSlice.reducer;

type UpdateProfessionTypeEntryTypeBody = {
    id: number;
    professionTypeId: number;
    entryTypeId: number;
};

type AddProfessionTypeEntryTypeBody = {
    professionTypeId: number;
    entryTypeId: number;
};

type ProfessionTypeEntryType = {
    id: number;
    professionTypeId: number;
    entryTypeId: number;
};
