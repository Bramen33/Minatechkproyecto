import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser = createAsyncThunk<
    any,
    string
>(
    "users/getUser",
    async (id,{rejectWithValue}) => {
        try {
            console.log(id);
            const response = await axios.get(`/api/users/${id}`)
            console.log(response);
            return response.data
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Error desconocido"
              );
        }
    }
)