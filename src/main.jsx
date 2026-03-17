import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import "./styles/globals.css";

const entryPoint = document.getElementById("root");

ReactDOM.createRoot(entryPoint).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
