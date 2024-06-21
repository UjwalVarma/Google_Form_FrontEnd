import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Form/Form";
import "./App.css";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Response from "./Response/Response";

function App() {
    return React.createElement(
        BrowserRouter,
        null,
        React.createElement(
            Routes,
            null,
            React.createElement(Route, {
                path: "/",
                element: React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(Header, null),
                    React.createElement(Form, null),
                    React.createElement(Footer, null)
                )
            }),
            React.createElement(Route, { path: "/response", element: React.createElement(Response, null) })
        )
    );
}

export default App;
