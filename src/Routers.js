import React from "react";
import App from "./Pages/App";
import Users from "./Pages/Users";
import Layout from "./Components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<App />} index />
          <Route path="users" element={<Users />} />
        </Route>

        <Route
          path="*"
          element={
            <div>
              <h2>No encontrado</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
