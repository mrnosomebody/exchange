import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import DefaultButton from "./UI/button/DefaultButton";
import axios from "axios";

const RegisterForm = () => {
    const [user, setUser] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    })

    const {store} = useContext(Context)

    return (
        <div>
            <input
                onChange={e => setUser({...user, email: e.target.value})}
                value={user.email}
                type="text"
                placeholder="email"
            />
            <input
                onChange={e => setUser({...user, first_name: e.target.value})}
                value={user.first_name}
                type="text"
                placeholder="first name"
            />
            <input
                onChange={e => setUser({...user, last_name: e.target.value})}
                value={user.last_name}
                type="text"
                placeholder="last name"
            />
            <input
                onChange={e => setUser({...user, password: e.target.value})}
                value={user.password}
                type="password"
                placeholder="password"
            />
            <DefaultButton onClick={() => store.register(
                user.email,
                user.first_name,
                user.last_name,
                user.password
            )}>
                Register
            </DefaultButton>
        </div>
    );
};

export default RegisterForm;