import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import AppLayout from "../components/AppLayout";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import RedirectPage from "../pages/RedirectPage";

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
    path: "/",
    element: <RedirectPage />,
  },
  {
    path: "/ib",
    element: <AppLayout />,
    children: [
      {
        path: "/ib/home",
        element: <Home />,
      },
      {
        path: "/ib/admin",
        element: <AdminDashboard />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default Routes;
