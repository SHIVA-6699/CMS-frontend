// redux/features/LiveStream/liveStreamApi.js

import baseApi from "../api/baseApi";
export const liveStreamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLiveStreams: builder.query({
      query: () => "/live-stream",
      providesTags: ["LiveStream"],
    }),
    createLiveStream: builder.mutation({
      query: (newLiveStream) => ({
        url: "/live-stream/create",
        method: "POST",
        body: newLiveStream,
      }),
      invalidatesTags: ["LiveStream"],
    }),
    updateLiveStream: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/live-stream/update/${id}`,
        method: "PUT",
        body: { isActive },
      }),
      invalidatesTags: ["LiveStream"],
    }),
  }),
});

export const {
  useGetLiveStreamsQuery,
  useCreateLiveStreamMutation,
  useUpdateLiveStreamMutation,
} = liveStreamApi;
