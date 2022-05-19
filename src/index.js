import React from "react";
import ReactDOM from "react-dom";
import img from "./test.jpg";
import "./styles.css";

function App() {
  return (
    <div>
      <img src={img} />
      <h1>Hello eWorld</h1>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
