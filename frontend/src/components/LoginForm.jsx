import React, {useContext, useState} from 'react';
import DefaultButton from "./UI/button/DefaultButton";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import '../styles/main.css'
import '../styles/LoginForm.css'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {store} = useContext(Context)

    return (
        <div className='main'>
            <h1>{store.isAuthenticated ? 'Authorized' : 'Please Login'}</h1>
            <div className="input-control">
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder="email"
                    className="input-field"
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="password"
                    className="input-field"
                />
                <DefaultButton onClick={() => store.login(email, password)}>Login</DefaultButton>

            </div>

        </div>
    );
};

export default observer(LoginForm);