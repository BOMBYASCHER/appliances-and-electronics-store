import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from '.';

export const returnsApi = createApi({
  reducerPath: 'returnsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: urls.data.returns,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication.accessToken;
      console.log(token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Returns'],
  endpoints: (builder) => ({
    getReturns: builder.query({
      query: () => '',
      providesTags: ['Returns'],
      transformResponse: (response, meta, arg) => response,
    }),
    createReturn: builder.mutation({
      query: ({ orderId, purchaseId, reason, photo }) => {
        console.log('Inside createReturnAPI method() - ' + 'orderId: ' + orderId + 'purchaseId: ' + purchaseId + 'reason: ' + reason)
        const formData = new FormData();
        formData.append('request', new Blob([JSON.stringify({ orderId, purchaseId, reason })], { type: 'application/json' }));
        formData.append('photoFile', photo);
        return {
          url: '',
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }
      },
      providesTags: ['Returns'],
      transformResponse: (response, meta, arg) => ({ data: response, status: meta.response.status }),
      transformErrorResponse: (response, meta, arg) => ({ data: arg, status: meta.response.status }),
    }),
  })
});

export const {
  useGetReturnsQuery,
  useCreateReturnMutation,
} = returnsApi;
