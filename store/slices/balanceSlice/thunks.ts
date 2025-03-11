import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { getUsers } from "../userSlice/thunks"

// Definir la estructura del payload que se enviará
interface UpdateBalanceData {
  id: number
  balance: number
  amount: number
  type: string
}

// Definir la estructura de la respuesta
interface Balance {
  id: number
  balance: number
  amount: number
  type: "deposito" | "retiro"
}

// Crear el thunk con tipos correctos
export const updateBalance = createAsyncThunk<
  Balance, // Tipo de retorno esperado
  UpdateBalanceData // Tipo de argumento esperado
>(
  "balance/updateBalance",
  async (data, { dispatch, rejectWithValue}) => {
    try {
      const response = await axios.put(`/api/balance`, data)
      dispatch(getUsers()) // Despachar acción
      return response.data
    } catch (error:any) {
      return rejectWithValue(error.response?.data?.message || "Error desconocido")
    }
  }
)

  export const getBalance = createAsyncThunk<
    any,
    number
  >(
    "balance/getBalance",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/balance/${id}`)
            return response.data
        } catch (error:any) {
          return rejectWithValue(
            error.response?.data?.message || "Error desconocido"
          );
        }
    }
)