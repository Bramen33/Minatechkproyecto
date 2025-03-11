// store/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../../slices/userSlice/thunks'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [], // Estado inicial del usuario
    status:'idle',
    error:null
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload; // Actualiza el estado del usuario
    },
    clearUser: (state) => {
      state.value = null; // Resetea el estado del usuario
    },
    clearError: (state) => {
      state.error = null; // Resetea el estado del usuario
    },
    clearStatus: (state) => {
      state.state = 'idle'; // Resetea el estado del usuario
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
});

export const { setUser, clearUser, clearError, clearStatus } = userSlice.actions;

export default userSlice.reducer;
