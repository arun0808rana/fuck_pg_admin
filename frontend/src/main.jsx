import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import './index.css';
import TabbedHeader from "./components/TabbedHeader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TabbedHeader/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  </React.StrictMode>
);
