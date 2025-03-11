import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getBalance, updateBalance } from './thunks'

// Define la estructura del estado
interface BalanceState {
  balance: any | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Estado inicial tipado
const initialState: BalanceState = {
  balance: null,
  status: 'idle',
  error: null,
}

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearStatus: (state) => {
      state.status = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBalance.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateBalance.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(updateBalance.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Error desconocido'
      })
      .addCase(getBalance.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getBalance.fulfilled, (state, action: PayloadAction<any|null>) => {
        state.status = 'succeeded'
        state.balance = action.payload
      })
      .addCase(getBalance.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Error desconocido'
      })
  },
})

export const { clearError, clearStatus } = balanceSlice.actions
export default balanceSlice.reducer
