import baseApi from "../api/baseApi";

const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a role (POST)
    createRole: builder.mutation({
      query: (data) => ({
        url: "/roles/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Role"],
    }),

    // Fetch roles (GET)
    getRoles: builder.query({
      query: () => ({
        url: "/roles",
        method: "GET",
      }),
      providesTags: ["Role"],
    }),

    // Edit a role (PUT)
    editRole: builder.mutation({
      query: ({ roleId, data }) => ({
        url: `/roles/${roleId}`, // Passing roleId dynamically
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Role"],
    }),

    // Delete a role (DELETE)
    deleteRole: builder.mutation({
      query: (roleId) => ({
        url: `/roles/${roleId}`, // Passing roleId dynamically
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),

    // Assign permissions to a role (POST)
    addPermissionToRole: builder.mutation({
      query: ({ roleId, permissions }) => ({
        url: `/roles/${roleId}/add-permissions`, // Pass roleId in the URL
        method: "POST",
        body: { permissions },
      }),
      invalidatesTags: ["Role"],
    }),
    removePermissionFromRole: builder.mutation({
      query: ({ roleId, permissions }) => ({
        url: `/roles/${roleId}/remove-permissions`, // Pass roleId in the URL
        method: "POST",
        body: { permissions }, // Send permissions as an array in the body
      }),
      invalidatesTags: ["Role"],
    }),
    getPermissionsForRole: builder.query({
      query: (roleId) => ({
        url: `/roles/${roleId}/permissions`, // Fetch permissions based on roleId
        method: "GET",
      }),
      providesTags: ["Role"], // You can adjust this tag if needed
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useGetRolesQuery,
  useEditRoleMutation,
  useDeleteRoleMutation,
  useAddPermissionToRoleMutation,
  useRemovePermissionFromRoleMutation,
  useGetPermissionsForRoleQuery
} = roleApi;

export default roleApi;
