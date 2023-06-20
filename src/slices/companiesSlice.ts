import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import client from '../utils/apiUtils'

export const fetchCompanies = createAsyncThunk(
    'companies/fetchCompanies',
    async () => {
        const response = await client.get('/company/all');
        return response.data;
    }
);

export const addNewCompany = createAsyncThunk(
    'companies/addNewCompany',
    async (initialCompany: AddCompanyBody) => {
        const response = await client.post('/company/add', initialCompany);
        return response.data;
    }
);

export const updateCompany = createAsyncThunk(
    'companies/updateCompany',
    async (initialCompany: UpdateCompanyBody) => {
        const response = await client.put('/company/update', initialCompany);
        return response.data;
    }
);

export const deleteCompany = createAsyncThunk(
    'companies/deleteCompany',
    async (companyId: number) => {
        const response = await client.del(`/company/delete/${companyId}`);
        if (!response.ok) throw new Error("Failed to delete");
        return companyId;
    }
);

interface CompaniesState {
    companies: Company[],
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
            });
        builder
            .addCase(addNewCompany.fulfilled, (state, action) => {
                state.companies.push(action.payload);
                state.error = null;
            })
            .addCase(addNewCompany.rejected, (state, action) => {
                state.error = 'failed to add';
            });
        builder
            .addCase(updateCompany.fulfilled, (state, action) => {
                const existingCompany = state.companies.find(company => company.id === action.payload.id);
                if (existingCompany) {
                    Object.assign(existingCompany, action.payload);
                }
                state.error = null;
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.error = 'failed to update';
            });
        builder
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.companies = state.companies.filter(company => company.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteCompany.rejected, (state, action) => {
                state.error = 'failed to delete';
            });
        
        
    }
});

export default companiesSlice.reducer;

type UpdateCompanyBody = {
    id: number;
    name: string;
};

type AddCompanyBody = {
    name: string;
};

type Company = {
    id: number; 
    name: string;
};
