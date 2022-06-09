import React from "react";
import App from "pages/App";
import Users from "pages/Users";
import NotFound from "pages/NotFound";
import Layout from "components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<App />} index />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
