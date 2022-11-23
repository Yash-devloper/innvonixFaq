import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardPage, LogInPage } from "../pages";

export const appRouter = (isLoggedIn) =>
  createBrowserRouter([
    {
      path: "/",
      element: !isLoggedIn ? <LogInPage /> : <Navigate to="/dashboard" />,
    },
    {
      path: "/dashboard",
      element: isLoggedIn ? <DashboardPage /> : <Navigate to="/" />,
    },
  ]);
