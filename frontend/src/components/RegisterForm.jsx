import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {NotificationContainer, NotificationManager} from "react-notifications";

import DefaultButton from "./UI/button/DefaultButton";

import '../styles/main.css'
import '../styles/LoginForm.css'

const RegisterForm = () => {
    const [user, setUser] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    })

    const {store} = useContext(Context)

    return (
        <div className='main'>
            <div className="input-control">
                <input
                    onChange={e => setUser({...user, email: e.target.value})}
                    value={user.email}
                    type="text"
                    placeholder="email"
                    className="input-field"
                />
                <input
                    onChange={e => setUser({...user, first_name: e.target.value})}
                    value={user.first_name}
                    type="text"
                    placeholder="first name"
                    className="input-field"
                />
                <input
                    onChange={e => setUser({...user, last_name: e.target.value})}
                    value={user.last_name}
                    type="text"
                    placeholder="last name"
                    className="input-field"
                />
                <input
                    onChange={e => setUser({...user, password: e.target.value})}
                    value={user.password}
                    type="password"
                    placeholder="password"
                    className="input-field"
                />
                <DefaultButton onClick={() => store.register(
                    user.email,
                    user.first_name,
                    user.last_name,
                    user.password
                )
                    .then(response => {
                        if (response) {
                            NotificationManager.success('Account created successfully')
                        } else {
                            NotificationManager.error('Error')
                        }
                    })
                }>
                    Register
                </DefaultButton>
                <NotificationContainer/>
            </div>
        </div>
    );
};

export default RegisterForm;