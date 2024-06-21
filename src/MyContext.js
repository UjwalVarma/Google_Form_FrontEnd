import React, { createContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [count, setCount] = useState(1);

    const contextValue = {
        count,
        setCount
    };

    return React.createElement(
        MyContext.Provider,
        { value: contextValue },
        children
    );
};

export default MyContext;
