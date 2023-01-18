import React from 'react';

import classes from './DefaultInput.module.css'

const DefaultInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={classes.default_input} {...props}/>
    );
});

export default DefaultInput;