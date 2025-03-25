import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import AppLayout from "../components/AppLayout";
import SignUp from "../pages/SignUp";
import AccessDenied from "../pages/AccessDenied";
import { getItem } from "../utils/utils";
import SignOut from "../components/SignOut";
import PageNotFound from "../pages/PageNotFound";
import EventTag from "../pages/EventTag";
import { ACCESSDENIED, BASE, EVENTTAGPATH, FORGOTPASSWORD, LOGINPATH, RESETPASSWORD, ROLESPATH, SIGNOUTPATH, SIGNUPPATH, USERSPATH } from "./routePaths";
import Roles from "../pages/Roles";
import Users from "../pages/Users";
import Dashboard from "../pages/Dashboard";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

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
    path: FORGOTPASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: RESETPASSWORD,
    element: <ResetPassword />,
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
            <Dashboard/>
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
      {
        path: USERSPATH,
        element: (
          <AuthWrapper>
            <Users />
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
