import { configureStore, createSlice } from '@reduxjs/toolkit';
import { phoneBookApi } from './contacts';

const initialState = {
  phoneBook: [],
  filter: '',
};

const phoneBookSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    filterContacts(state, action) {
      state.filter = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
     contacts: phoneBookSlice.reducer, 
    [phoneBookApi.reducerPath]: phoneBookApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    phoneBookApi.middleware,
  ],
});

export const { filterContacts } =
  phoneBookSlice.actions;
