// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice'
import balanceReducer from './slices/balanceSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    balance: balanceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export default store;