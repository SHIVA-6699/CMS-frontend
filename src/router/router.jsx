import { Navigate } from "react-router-dom";
import Login from "../components/forms/Login";
import CreatePermissionForm from "../components/Permissions/CreatePermission";
import Dashboard from "../components/Dashboard/Dashboard";
import PremissionLayout from "../Layout/PremissionLayout";
import RoleLayout from "../Layout/RoleLayout";
import UsersLayout from "../Layout/UsersLayout";
import UsersCategoryLayout from "../Layout/UserCategoryLayout";
import NotAuthorized from "../utils/NotAuthroziedPage";
import ForgotPassword from "../components/ForgotPassword";
import ContentCreateDashboard from "../components/Content/ContentCreateDashboard";
import CreateLive from "../components/Content/LiveStream/CreateLive";
import CreateBreakingNews from "../components/Content/CreateBreakingNews";
import ProtectedRoute from "../Layout/ProtectedRoute";
import { TRole } from "../constants/roles";
import LiveStreamLayout from "../Layout/LiveStreamLayout";
const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/permissions", component: <PremissionLayout /> },
  { path: "/roles", component: <RoleLayout /> },
  { path: "/users", component: <UsersLayout /> },
  { path: "/users-category", component: <UsersCategoryLayout /> },
  { path: "/not-authorized", component: <NotAuthorized /> },
  {
    path: "/create-article",
    component: (
      <ProtectedRoute roles={[TRole.ADMIN,]}>
        <ContentCreateDashboard />
      </ProtectedRoute>
    ),
  },
  { path: "/create-live", component: <LiveStreamLayout/> },
  { path: "/create-breakingnews", component: <CreateBreakingNews /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const authRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/forgot-users-password", component: <ForgotPassword /> },
];

export { userRoutes, authRoutes };
