  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    user: null,
    token: null,
    role: null,
    rolPer:null,
    permissions: [],
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logIn: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.permissions = action.payload.permissions || [];
        state.role=action.payload.role;
        state.rolPer=action.payload.rolePer;

      console.log(state.user,state.permissions,state.role,state.rolPer) 
      },
      logOut: (state) => {
        state.user = null;
        state.token = null; 
        state.permissions = [];
        state.role=null;
        state.rolPer=null;
      },
    },
  });

  export const { logIn, logOut } = authSlice.actions;

  export const selectToken = (state) => state.auth.token;
  export const selectUser = (state) => state.auth.user;
  export const selectPermissions = (state) => state.auth.permissions;
  export const selectCurrentRole = (state) => state.auth.role;
  export const selectRolePermission=(state) => state.auth.rolPer;

  export const authReducer = authSlice.reducer;
