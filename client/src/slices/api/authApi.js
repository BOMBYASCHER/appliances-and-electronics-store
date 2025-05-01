import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { urls } from '.';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: urls.auth }),
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ phone, password }) => ({
        url: 'login',
        method: 'POST',
        body: { phone, password },
      }),
      transformResponse: (response, meta, arg) => ({ data: response, status: meta.response.status }),
      transformErrorResponse: (response, meta, arg) => ({ data: arg, status: meta.response.status }),
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
