import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { logIn, logOut } from "../auth/authSlice.js";
import { useNavigate } from "react-router-dom";

const api_url = import.meta.env.VITE_API_URL;

// Create a custom base query for API requests
const baseQuery = fetchBaseQuery({
  baseUrl: api_url,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `${token}`);
    }

    return headers;
  },
});

// Add the baseQuery to handle errors and token refresh logic
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle 404 or 403 errors globally
  if (result?.error?.status === 404) {
    // Display appropriate error message for 404
    const errorMessage = result?.error?.data?.errorSources?.length
      ? result?.error?.data?.errorSources[0]?.message
      : "Resource not found";
    toast.error(errorMessage, { duration: 2000 });
  }

  // Handle 403 Forbidden error
  if (result?.error?.status === 403) {
    // Show "Not Authorized" message
    toast.error("Not Authorized", { duration: 2000 });

    // Redirect to the default route (e.g., "/")
    const navigate = useNavigate();
    navigate("/"); // This will redirect to the home page or login page depending on your routing setup

    // Log out the user immediately
    api.dispatch(logOut());
  }

  // Handle 401 Unauthorized errors (token expiration)
  if (result?.error?.status === 401) {
    try {
      // Attempt to refresh the token
      const res = await fetch(`${api_url}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.data?.accessToken) {
          // Decode user information from the new access token
          const user = jwtDecode(data?.data?.accessToken);

          // Dispatch login action with the new token
          api.dispatch(logIn({ user, token: data?.data?.accessToken }));

          // Retry the original request with the new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // If no new token is received, log out the user
          api.dispatch(logOut());
          toast.error("Failed to refresh token. Please log in again.", {
            duration: 2000,
          });
        }
      } else {
        // If the refresh token request fails, log out the user
        api.dispatch(logOut());
        toast.error("Failed to refresh token. Please log in again.", {
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error refreshing token", error);
      // If network or other error during token refresh, log out
      api.dispatch(logOut());
      toast.error("Failed to refresh token. Please log in again.", {
        duration: 2000,
      });
    }
  }

  return result;
};

// Define the baseApi with the custom base query
const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}), // No default endpoints
  tagTypes: [
    "Permission",
    "Role",
    "UserCategory",
    "User",
    "AuditLog",
    "LiveStream",
  ],
});

export default baseApi;
