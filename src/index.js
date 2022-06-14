import React from "react";
import ReactDOM from "react-dom/client";
import Routers from "./Routers";
import UserProvider from "context/User/UserProvider";
import { queryClient } from "config/";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { QueryClientProvider } from "react-query";

import "react-loading-skeleton/dist/skeleton.css";
import "inter-ui/inter.css";
import "styles/styles.scss";
import "styles/utils.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Routers />
        </UserProvider>
      </QueryClientProvider>
    </GeistProvider>
  </React.StrictMode>
);
