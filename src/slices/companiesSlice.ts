import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchCompanies = createAsyncThunk(
    'companies/fetchCompanies',
    async () => {
        const response = await client.get('/company/all');
        return response;
    }
);

interface CompaniesState {
    companies: any[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: any
}

const initialState: CompaniesState = {
    companies: [],
    status: 'idle',
    error: null
};

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.companies = state.companies.concat(action.payload)
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export default companiesSlice.reducer;