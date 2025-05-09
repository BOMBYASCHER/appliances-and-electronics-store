import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from ".";

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: urls.data.orders,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      console.log(token)
      return headers;
    },
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '',
      providesTags: ['Orders'],
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => ({ data: arg, status: meta.response.status }),
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: '',
        method: 'POST',
        body: order,
        headers: {
          "content-type": "application/json"
        },
      }),
      providesTags: ['Orders'],
      transformResponse: (response, meta, arg) => ({ data: response, status: meta.response.status }),
      transformErrorResponse: (response, meta, arg) => ({ data: arg, status: meta.response.status }),
    }),
  })
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
} = ordersApi;
