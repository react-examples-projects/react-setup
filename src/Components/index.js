import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import "inter-ui/inter.css";
import "../styles/styles.scss";

function Index() {
  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <App />
    </GeistProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssBaseline />
    <GeistProvider>
      <Index />
    </GeistProvider>
  </React.StrictMode>
);
