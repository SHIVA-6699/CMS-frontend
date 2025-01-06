import baseApi from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // New endpoint: Assign role to user
    assignRoleToUser: builder.mutation({
      query: ({ userId, roleId }) => ({
        url: "/users/assign-role",
        method: "POST",
        body: { userId, roleId },
      }),
      invalidatesTags: ["User"],
    }),

    // New endpoint: Remove role from user
    removeRoleFromUser: builder.mutation({
      query: ({ userId }) => ({
        url: "/users/remove-role",
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["User"],
    }),

    // New endpoint: Assign permissions to user
    assignPermissionsToUser: builder.mutation({
      query: ({ userId, permissionIds }) => ({
        url: "/users/assign-permission",
        method: "POST",
        body: { userId, permissionIds },
      }),
      invalidatesTags: ["User"],
    }),

    // New endpoint: Remove permissions from user
    removePermissionsFromUser: builder.mutation({
      query: ({ userId, permissionId }) => ({
        url: "/users/remove-permission",
        method: "POST",
        body: { userId, permissionId },
      }),
      invalidatesTags: ["User"],
    }),
    getUserPermissions: builder.query({
      query: (userId) => ({
        url: `/users/user-permissions/${userId}/permissions`,
        method: "GET",
      }),
      providesTags: ["User"],
      // Fetch permissions for a specific user
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
  useGetUserPermissionsQuery,
  useAssignRoleToUserMutation,
  useRemoveRoleFromUserMutation,
  useAssignPermissionsToUserMutation,
  useRemovePermissionsFromUserMutation,
} = userApi;

export default userApi;
