import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (_, { getState }) => {
      
      try {
        const response = await axios.get(`/api/users`);
        return response.data;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Error desconocido"
        );
      }
    }
  );