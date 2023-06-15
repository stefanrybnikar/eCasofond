import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchProfessions = createAsyncThunk(
    'professions/fetchProfessions',
    async () => {
        const response = await client.get('/professiontype/all');
        return response.data;
    }
);

export const addNewProfession = createAsyncThunk(
    'professions/addNewProfession',
    async (initialProfession: AddProfessionBody) => {
        const response = await client.post('/professiontype/add', initialProfession);
        return response.data;
    }
);

export const updateProfession = createAsyncThunk(
    'professions/updateProfession',
    async (initialProfession: UpdateProfessionBody) => {
        const response = await client.put('/professiontype/update', initialProfession);
        return response.data;
    }
);

export const deleteProfession = createAsyncThunk(
    'professions/deleteProfession',
    async (professionId: number) => {
        const response = await client.del(`/professiontype/delete/${professionId}`);
        if (!response.ok) throw new Error("Failed to delete");
        return professionId;
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
            });
        builder
            .addCase(addNewProfession.fulfilled, (state, action) => {
                state.professions.push(action.payload);
                state.error = null;
            })
            .addCase(addNewProfession.rejected, (state, action) => {
                state.error = 'failed to add';
            });
        builder
            .addCase(updateProfession.fulfilled, (state, action) => {
                const existingProfession = state.professions.find(profession => profession.id === action.payload.id);
                if (existingProfession) {
                    Object.assign(existingProfession, action.payload);
                }
                state.error = null;
            })
            .addCase(updateProfession.rejected, (state, action) => {
                state.error = 'failed to update';
            });
        builder
            .addCase(deleteProfession.fulfilled, (state, action) => {
                state.professions = state.professions.filter(profession => profession.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteProfession.rejected, (state, action) => {
                state.error = 'failed to delete';
            });
        
    }
});

export default professionsSlice.reducer;

type UpdateProfessionBody = {
    id: number;
    name: string;
}

type AddProfessionBody = {
    name: string;
}