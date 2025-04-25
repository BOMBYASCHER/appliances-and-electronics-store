import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4040/api/auth' }),
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ phone, password }) => ({
        url: 'login',
        method: 'POST',
        body: { phone, password },
      }),
    }),
    registration: build.mutation({
      query: ({ fullName, phone, password }) => ({
        url: 'registration',
        method: 'POST',
        body: { fullName, phone, password },
      }),
    }),
  }),
})

export const { useLoginMutation, useRegistrationMutation } = authApi;
