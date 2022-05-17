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
    saveContact(state, action) {
      state.phoneBook.push(action.payload);
    },
    deleteContact(state, action) {
      const index = state.phoneBook.findIndex(
        contact => contact.id === action.payload
      );
      state.phoneBook.splice(index, 1);
    },
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

export const { saveContact, deleteContact, filterContacts } =
  phoneBookSlice.actions;
