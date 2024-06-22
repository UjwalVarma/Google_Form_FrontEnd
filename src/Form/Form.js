import React, { useContext, useEffect, useState } from "react";
import formData from "../assets/question.json";
import "./Form.css";
import Framework from "../MyContext";

const getPageData = (count) => {
  const pageData = formData.find((item) => item.page === count);
  return pageData ? pageData.questions : [];
};

const Form = () => {
  const { count } = useContext(Framework);
  const [data, setData] = useState(getPageData(count));

  useEffect(() => {
    setData(getPageData(count));
    const unparsedLocalPageData = localStorage.getItem(`page${count}`);
    const localPageData = JSON.parse(unparsedLocalPageData);

    // Update input values except for file inputs
    const inputsToUpdate = document.querySelectorAll("input, textarea, select");
    inputsToUpdate.forEach((item, index) => {
      const inputKey = item.id;
      const inputValue = localPageData?.[index]?.inputValue;
      if (inputValue && item.type !== "file") {
        item.value = inputValue;
      }
    });
  }, [count]);

  const handleChange = (event, accessor_key) => {
    const newValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    // Handle state update for form data or use localStorage directly
    // Example: updateFormData(accessor_key, newValue);
  };

  return (
    <div className="q-container">
      <form id="form-data">
        {data.map((item, index) => (
          <div className="q-card" key={index}>
            <div>
              <label htmlFor={item.accessor_key}>
                {item.label}
                {item.required && <span>*</span>}
              </label>
            </div>
            {item.description && <p>Description: {item.description}</p>}
            {item.options ? (
              item.options.map((choice, idx) => (
                <div className="choice" key={idx}>
                  <input
                    id={`${item.accessor_key}-${idx}`}
                    type="radio"
                    name={item.accessor_key}
                    value={choice}
                    onChange={(e) => handleChange(e, item.accessor_key)}
                    required={item.required}
                  />
                  <label className="choice-label" htmlFor={`${item.accessor_key}-${idx}`}>
                    {choice}
                  </label>
                </div>
              ))
            ) : item.type === "textarea" ? (
              <textarea
                id={item.accessor_key}
                required={item.required}
                placeholder="Your answer"
                onChange={(e) => handleChange(e, item.accessor_key)}
              />
            ) : item.type === "file" ? (
              <div>
                <input
                  id={item.accessor_key}
                  type="file"
                  required={item.required}
                  className="file-style"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={(e) => handleChange(e, item.accessor_key)}
                />
              </div>
            ) : (
              <input
                id={item.accessor_key}
                type={item.type}
                required={item.required}
                placeholder="Your answer"
                onChange={(e) => handleChange(e, item.accessor_key)}
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Form;
