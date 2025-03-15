import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import AppLayout from "../components/AppLayout";
import SignUp from "../pages/SignUp";
import AccessDenied from "../pages/AccessDenied";
import { getItem } from "../utils/utils";
import SignOut from "../components/SignOut";
import PageNotFound from "../pages/PageNotFound";
import EventTag from "../pages/EventTag";
import { ACCESSDENIED, ADMINPATH, BASE, EVENTTAGPATH, LOGINPATH, ROLESPATH, SIGNOUTPATH, SIGNUPPATH } from "./routePaths";
import Roles from "../pages/Roles";
import Users from "../pages/Users";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: LOGINPATH,
    element: <Login />,
  },
  {
    path: SIGNUPPATH,
    element: <SignUp />,
  },
  {
    path: SIGNOUTPATH,
    element: <SignOut />,
  },
  {
    path: BASE,
    element: (
      <AuthWrapper>
        <AppLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: BASE,
        element: (
          <AuthWrapper>
            <Users />
          </AuthWrapper>
        ),
      },
      {
        path: ADMINPATH,
        element: (
          <AuthWrapper>
            <AdminDashboard />
          </AuthWrapper>
        ),
      },
      {
        path: EVENTTAGPATH,
        element: (
          <AuthWrapper>
            <EventTag />
          </AuthWrapper>
        ),
      },
      {
        path: ROLESPATH,
        element: (
          <AuthWrapper>
            <Roles />
          </AuthWrapper>
        ),
      },
    ],
  },
  {
    path: ACCESSDENIED,
    element: <AccessDenied />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Routes;
