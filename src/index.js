import React from "react";
import ReactDOM from "react-dom";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import "./styles.css";
import "inter-ui/inter.css";

function Home() {
  return (
    <div>
      <h1>Home Component</h1>
    </div>
  );
}

function App() {
  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <Home />
    </GeistProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
