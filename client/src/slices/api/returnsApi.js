import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from '.';

const returnsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: urls.data.returns,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication.accessToken;
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
        const formData = new FormData();
        formData.append('orderId', orderId);
        formData.append('purchaseId', purchaseId);
        formData.append('reason', reason);
        formData.append('photo', photo);
        return {
          url: '',
          method: 'POST',
          body: formData,
          headers: {
            "content-type": "multipart/form-data"
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
