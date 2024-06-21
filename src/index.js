import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import  { MyProvider } from "./MyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    React.createElement(
        MyProvider,
        null,
        React.createElement(App, null)
    )
);
