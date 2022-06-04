import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import "inter-ui/inter.css";
import "../styles/styles.scss";
import "../styles/utils.css";


function Index() {
  return (
    <GeistProvider>
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
