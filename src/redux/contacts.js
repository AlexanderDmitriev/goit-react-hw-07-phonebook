import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phoneBookApi = createApi({
  reducerPath: 'phoneBook',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62828f5aed9edf7bd8867f25.mockapi.io/contacts',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getAllContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: ({name,number}) => ({
        url: `/contacts`,
        method: 'POST',
        body: {
          name:name,
          phone:number,
        },
        
      }),invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
       
      }), invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = phoneBookApi;
