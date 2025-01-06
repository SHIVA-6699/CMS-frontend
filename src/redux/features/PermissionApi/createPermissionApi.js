import baseApi from "../api/baseApi";

const permissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPermission: builder.mutation({
      query: (data) => ({
        url: "/permissions/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Permission"],
    }),
    getPermissions: builder.query({
      query: () => ({
        url: "/permissions",
        method: "GET",
      }),
      providesTags: ["Permission"],
    }),
    editPermission: builder.mutation({
      query: ({ permissionId, ...data }) => ({
        url: `/permissions/${permissionId}`, // Append `permissionId` to the URL
        method: "PUT",
        body: data, // Send only `name` and `description` in the body
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Permission"],
    }),
    deletePermission: builder.mutation({
      query: (permissionId) => ({
        url: `/permissions/${permissionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Permission"],
    }),
  }),
});

export const {
  useCreatePermissionMutation,
  useGetPermissionsQuery,
  useEditPermissionMutation,
  useDeletePermissionMutation,
} = permissionApi;

export default permissionApi;
