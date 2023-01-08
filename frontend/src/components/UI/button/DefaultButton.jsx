import React from 'react';
import classes from "./DefaultButton.module.css";

const DefaultButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.default_button}>
            {children}
        </button>
    );
};

export default DefaultButton;