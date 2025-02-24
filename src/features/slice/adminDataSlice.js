import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAdminData = createAsyncThunk('admin/fetchAdminData', async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) {
    return rejectWithValue("No token found");
  }
  
  try {
    const response = await fetch("http://localhost:5000/api/admin/admindata", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    // console.log("fetched admin data>>", data); // Debug log
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    adminData: null, // Corrected field name
    status: 'idle',
    error: null,
  },
  reducers: {
    clearAdminData: (state) => {
      state.adminData = null; // Corrected field name
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.adminData = action.payload; // Corrected field name
        state.status = 'succeeded';
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;
