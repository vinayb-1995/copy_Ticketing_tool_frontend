import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAgentsAllData = createAsyncThunk(
  "allAgents/fetchAgentsAllData",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    // console.log("Token:>>", token);
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/allagentsdata",
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
      return data; // Assuming data is an array of Agents objects
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const agentsSlice = createSlice({
  name: "allagents",
  initialState: {
    allAgentsData: [], // Adjusted to an empty array to hold multiple Agents objects
    status: "idle",
    error: null,
  },
  reducers: {
    clearAgentsData: (state) => {
      state.allAgentsData = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgentsAllData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAgentsAllData.fulfilled, (state, action) => {
        state.allAgentsData = action.payload; // Assign array of Agents objects directly
        state.status = "succeeded";
      })
      .addCase(fetchAgentsAllData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { clearAgentsData } = agentsSlice.actions;
export default agentsSlice.reducer;
