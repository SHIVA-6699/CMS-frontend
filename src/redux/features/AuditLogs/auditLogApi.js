import baseApi from "../api/baseApi";

const auditLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create User Category
    getAuditLogs: builder.query({
      query: () => ({
        url: "/audit-logs",
        method: "GET",
      }),
      providesTags: ["AuditLog"],
    }),
  }),
});

export const { useGetAuditLogsQuery } = auditLogApi