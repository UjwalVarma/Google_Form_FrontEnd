import "./Header.css";
import React from "react";

const Header = () => {
    return React.createElement(
        "div",
        { className: "header" },
        React.createElement(
            "div",
            { className: "header-container" },
            React.createElement("img", { src: "/image.png", alt: "" }),
            React.createElement(
                "div",
                { className: "header-card" },
                React.createElement("h1", null, "Candidate Application Form - VYZEN"),
                React.createElement(
                    "p",
                    null,
                    React.createElement("b", null, "Please fill out the following details accurately to apply for the position.. Ensure you upload necessary documents where required. Fields marked with an asterisk (*) are mandatory.")
                ),
                React.createElement("hr", null),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        null,
                        "ujwalvarma954@gmail.com ",
                        React.createElement("em", null, "Switch account"),
                        " "
                    ),
                    React.createElement("span", { className: "material-symbols-outlined" }, "cloud_upload")
                ),
                React.createElement(
                    "p",
                    null,
                    "The name, email, and photo associated with your Google account will be recorded when you upload files and submit this form"
                ),
                React.createElement("hr", null),
                React.createElement("span", null, "* Indicates required question")
            )
        )
    );
};

export default Header;
