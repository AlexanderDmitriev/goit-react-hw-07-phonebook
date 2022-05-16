import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const phoneBookApi = createApi({
    reducerPath: 'phobeBookAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://62828f5aed9edf7bd8867f25.mockapi.io/' }),
    endpoints: (builder) => ({
      getContactByName: builder.query({
        query: (name) => `contacts/${name}`,
      }),
    }),
  });

  export const { useGetContactByName } = phoneBookApi;