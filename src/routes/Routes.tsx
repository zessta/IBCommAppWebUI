import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import AppLayout from "../components/AppLayout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
// import RedirectPage from "../pages/RedirectPage";
import AccessDenied from "../pages/AccessDenied";
import { getItem } from "../utils/utils";
import SignOut from "../components/SignOut";
import PageNotFound from "../pages/PageNotFound";
import EventTag from "../pages/EventTag";
import { ACCESSDENIED, ADMINPATH, EVENTTAG } from "./routePaths";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup/:encodedString",
    element: <SignUp />,
  },
  {
    path: "/signout",
    element: <SignOut />,
  },
  {
    path: "/",
    element: (
      <AuthWrapper>
        <AppLayout />
      </AuthWrapper>
    ),
    children: [
      {
        path: "/",
        element: (
          <AuthWrapper>
            <Home />
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
        path: EVENTTAG,
        element: (
          <AuthWrapper>
            <EventTag />
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
