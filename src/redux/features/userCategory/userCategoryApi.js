import baseApi from "../api/baseApi";

const userCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create User Category
    createUserCategory: builder.mutation({
      query: (data) => ({
        url: "/user-category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserCategory"],
    }),

    // View User Categories
    getUserCategories: builder.query({
      query: () => ({
        url: "/user-category/view",
        method: "GET",
      }),
      providesTags: ["UserCategory"],
    }),

    // Edit User Category
    editUserCategory: builder.mutation({
      query: ({ categoryId, data }) => ({
        url: "/user-category/edit",
        method: "PUT",
        body: { categoryId, ...data },
      }),
      invalidatesTags: ["UserCategory"],
    }),

    // Delete User Category
    deleteUserCategory: builder.mutation({
      query: (categoryId) => ({
        url: "/user-category/delete",
        method: "DELETE",
        body: { categoryId },
      }),
      invalidatesTags: ["UserCategory"],
    }),
    // Get User catgory by Id
    getUserCategoryById: builder.query({
      query: (categoryId) => ({
        url: `/user-category/get-category-by-id/${categoryId}`,
        method: "GET",
      }),
      providesTags:["UserCategory"]
    }),
  }),
});

export const {
  useCreateUserCategoryMutation,
  useGetUserCategoriesQuery,
  useEditUserCategoryMutation,
  useDeleteUserCategoryMutation,
  useGetUserCategoryByIdQuery
  
} = userCategoryApi;

export default userCategoryApi;
