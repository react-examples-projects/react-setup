import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./Routers";
import { queryClient } from "config/";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { QueryClientProvider } from "react-query";

import "inter-ui/inter.css";
import "styles/styles.scss";
import "styles/utils.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Routers />
      </QueryClientProvider>
    </GeistProvider>
  </React.StrictMode>
);
