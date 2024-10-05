import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices',
  async () => {
    const response = await api.get('/invoices');
    return response.data;
  }
);

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default invoicesSlice.reducer;
