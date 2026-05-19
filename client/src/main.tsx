import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import "./index.css";

import App from "./App";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Home from "./pages/Home.tsx";

import ProtectedRoute from "./components/ProtectedRoute";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <BrowserRouter>

      {/* TOASTS */}
      <Toaster
        position="top-right"
      />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <App />

            </ProtectedRoute>
          }
        />

        {/* INVALID ROUTES */}
        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);