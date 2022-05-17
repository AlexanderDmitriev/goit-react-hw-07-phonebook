import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 export const phoneBookApi = createApi({
    reducerPath: 'phoneBookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://62828f5aed9edf7bd8867f25.mockapi.io/' }),
    endpoints: (builder) => ({
     /*  getContactByName: builder.query({
        query: (name) => `contacts/${name}`,
      }), */
      getAllContacts: builder.query({
        query: () => `contacts`,
      }),
    }),
  }); 

/*   export const phoneBookApi = createApi({
    reducerPath: 'phoneBookAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://62828f5aed9edf7bd8867f25.mockapi.io/' }),
    endpoints: (builder) => ({
      getAllContacts: builder.query({
        query: () => `contacts`,
      }),
    }),
  }); */

  export const { /* useGetContactByName, */ useGetAllContacts } = phoneBookApi;