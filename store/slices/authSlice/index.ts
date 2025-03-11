// store/slices/userSlice.js
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUser } from './thunks'

interface AuthState {
  userAuth: any | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Estado inicial tipado
const initialState: AuthState = {
  userAuth  : null,
  status: 'idle',
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userAuth = action.payload; // Actualiza el estado del usuario
    },
    clearUser: (state) => {
      state.userAuth = null; // Resetea el estado del usuario
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
          state.status = 'loading'
          state.error = null
      })  
      .addCase(getUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.userAuth = action.payload
            // localStorage.removeItem("user", JSON.stringify(state.userAuth));
            // localStorage.setItem("user", JSON.stringify(state.userAuth));
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
          state.status = 'failed'
          state.error = action.payload
      })
        
  }
});

export const { setUser, clearUser, clearError } = authSlice.actions;

export default authSlice.reducer;
