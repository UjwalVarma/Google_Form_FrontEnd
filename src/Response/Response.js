import "./Response.css";
import React, { useState } from "react";

const Response = () => {
    const [resData, setResData] = useState(null);
    const GetData = async () => {
        try {
            const response = await fetch("http://localhost:5000/response");
            const data = await response.json();
            console.log(data);
            setResData(data);
        } catch (err) {
            console.log("Unable to fetch data", err);
        }
    };
    return React.createElement(
        "div",
        { className: "response" },
        React.createElement(
            "div",
            { className: "response-container" },
            React.createElement("img", { src: "/image.png", alt: "" }),
            React.createElement(
                "div",
                null,
                React.createElement("h1", null, "Candidate Application Form - VYZEN"),
                React.createElement("p", null, "Your response has been recorded")
            ),
            React.createElement(
                "span",
                null,
                React.createElement(
                    "p",
                    null,
                    "This form was created inside of VYZEN. ",
                    React.createElement("em", null, "Report Abuse")
                ),
                React.createElement(
                    "h2",
                    null,
                    "Google ",
                    React.createElement("em", null, "Forms")
                )
            )
        ),
        React.createElement(
            "button",
            { className: "response-btn", onClick: GetData },
            "Get Data"
        ),
        resData && React.createElement(
            React.Fragment,
            null,
            React.createElement(
                "div",
                { className: "response-container" },
                resData.map((item, index) => 
                    React.createElement(
                        React.Fragment,
                        { key: index },
                        React.createElement(
                            "div",
                            { className: "response-page" },
                            React.createElement("h1", null, `Page ${index + 1} :`),
                            item.inputs.map((data, idx) => 
                                React.createElement(
                                    "div",
                                    { className: "response-card", key: idx },
                                    React.createElement("p", null, data.inputKey.replace("_", " ")),
                                    React.createElement("p", null, ":"),
                                    React.createElement("p", null, data.inputValue)
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

export default Response;
