import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./Routers";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import "inter-ui/inter.css";
import "./styles/styles.scss";
import "./styles/utils.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <Routers />
    </GeistProvider>
  </React.StrictMode>
);
