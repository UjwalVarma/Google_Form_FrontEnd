import React, { useContext } from "react";
import "./Footer.css";
import ProgressBar from "@ramonak/react-progress-bar";
import Framework from "../MyContext";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const { count, setCount } = useContext(Framework);
    const navigate = useNavigate();

    const handleNext = () => {
        if (count < 6) {
            setCount(count + 1);
        }
    };

    const handleBack = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const setLocalJsonData = () => {
        const arrOfInput = document.querySelectorAll("input");

        const inputJsonList = [];
        arrOfInput.forEach((item) => {
            inputJsonList.push({
                inputKey: item.id,
                inputValue: item.value,
            });
            item.value = ''
        });
        const stringifiedJson = JSON.stringify(inputJsonList);
        localStorage.setItem(`page${count}`, stringifiedJson);
        console.log("====", stringifiedJson);
    };

    const handleNextClick = () => {
        const form = document.querySelector("form");
    
        if (form.checkValidity()) {
            setLocalJsonData();
            handleNext();
        } else {
            form.reportValidity(); 
        }
    };

    const clearForm = () => {
        const arrOfInput = document.querySelectorAll("input");
        arrOfInput.forEach((item) => {
            item.value = "";
        });
    };

    const handleSubmit = async () => {
        setLocalJsonData();

        let allPagesData = [];
        for (let i = 1; i <= 6; i++) {
            const pageData = localStorage.getItem(`page${i}`);
            if (pageData) {
                allPagesData.push({
                    page: i,
                    inputs: JSON.parse(pageData),
                });
            }
            navigate("/response")
           
        }

        try {
            const response = await fetch("http://localhost:5000/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(allPagesData),
            });

            if (response.ok) {
                console.log("Data submitted successfully");

                for (let i = 1; i <= 6; i++) {
                    localStorage.removeItem(`page${i}`);
                }
            } else {
                console.error("Error submitting data");
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return React.createElement(
        "div",
        { className: "footer" },
        React.createElement(
            "div",
            { className: "footer-container" },
            React.createElement(
                "div",
                null,
                React.createElement(
                    "span",
                    null,
                    count === 6
                        ? React.createElement(
                            React.Fragment,
                            null,
                            count > 1 && React.createElement("button", { onClick: handleBack }, "Back"),
                            React.createElement("button", { onClick: handleSubmit }, "Submit")
                        )
                        : React.createElement(
                            React.Fragment,
                            null,
                            count > 1 && React.createElement("button", { onClick: handleBack }, "Back"),
                            React.createElement("button", { onClick: handleNextClick }, "Next")
                        )
                ),
                React.createElement(ProgressBar, {
                    completed: (count / 6) * 100,
                    bgColor: "yellow",
                    width: "10rem",
                    height: "10px",
                    isLabelVisible: false
                }),
                React.createElement("p", null, `Page ${count} out of 6`),
                React.createElement("p", { onClick: clearForm }, "Clear form")
            ),
            React.createElement("p", null, "Never submit passwords through Google Forms."),
            React.createElement(
                "p",
                null,
                "This form was created inside of VYZEN. ",
                React.createElement("em", null, "Report Abuse")
            ),
            React.createElement(
                "h1",
                null,
                "Google ",
                React.createElement("em", null, "Forms")
            )
        )
    );
};

export default Footer;
