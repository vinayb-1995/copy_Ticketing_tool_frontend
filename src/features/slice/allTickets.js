import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for fetching all tickets
export const fetchAllTickets = createAsyncThunk(
  "alltickets/fetchAllTickets",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Retrieve the token from auth state
    console.log("token>>",token)
    if (!token) {
      return rejectWithValue("No token found"); // Handle missing token error
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/allTickets",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add token to request headers
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data; // Return the fetched tickets data
    } catch (error) {
      return rejectWithValue(error.message); // Handle fetch errors
    }
  }
);

// Redux slice for managing all tickets
const allTicketSlice = createSlice({
  name: "alltickets",
  initialState: {
    allTicketsData: [], // To store fetched tickets data
    status: "idle", // idle, loading, succeeded, failed
    error: null, // To store any error message
  },
  reducers: {
    // Reducer to clear ticket data (optional)
    clearAllTicketsData: (state) => {
      state.allTicketsData = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTickets.pending, (state) => {
        state.status = "loading"; // Set status to loading when fetch is pending
      })
      .addCase(fetchAllTickets.fulfilled, (state, action) => {
        state.allTicketsData = action.payload; // Populate tickets data on success
        state.status = "succeeded";
      })
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch tickets"; // Set error on failure
        state.status = "failed";
      });
  },
});

// Export the clear tickets action
export const { clearAllTicketsData } = allTicketSlice.actions;

// Export the reducer to be used in the Redux store
export default allTicketSlice.reducer;
