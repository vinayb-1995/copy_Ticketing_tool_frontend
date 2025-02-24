import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchagentLoingData = createAsyncThunk(
  "agent/fetchagentLoingData",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    // console.log("token>>>", token);
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/agent/agentdata",
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
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const agentSlice = createSlice({
  name: "agent",
  initialState: {
    agentData: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearagentData: (state) => {
      state.agentData = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchagentLoingData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchagentLoingData.fulfilled, (state, action) => {
        state.agentData = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchagentLoingData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { clearagentData } = agentSlice.actions;
export default agentSlice.reducer;