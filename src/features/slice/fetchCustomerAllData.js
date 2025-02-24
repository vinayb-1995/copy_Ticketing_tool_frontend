import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomerAllData = createAsyncThunk(
  "allCustomer/fetchCustomerAllData",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    // console.log("Token:>>", token);
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/allcustomersdata",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data; // Assuming data is an array of customer objects
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customerData: [], // Adjusted to an empty array to hold multiple customer objects
    status: "idle",
    error: null,
  },
  reducers: {
    clearCustomerallData: (state) => {
      state.customerData = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerAllData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerAllData.fulfilled, (state, action) => {
        state.customerData = action.payload; // Assign array of customer objects directly
        state.status = "succeeded";
      })
      .addCase(fetchCustomerAllData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { clearCustomerData } = customerSlice.actions;
export default customerSlice.reducer;