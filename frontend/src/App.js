import React, {useContext, useEffect, useState} from "react"

import AssetPairsList from "./components/AssetPairsList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AssetPairDetail from "./pages/AssetPairDetail";
import Navbar from "./components/UI/Navbar/Navbar";
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import RegisterForm from "./components/RegisterForm";

const App = function () {
    const {store} = useContext(Context)
    const [formType, setFormType] = useState('login');

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.checkAuth()
        }
    }, [])

    if (!store.isAuthenticated) {
        return (
            <div>
                {formType === 'login' ? <LoginForm/> : <RegisterForm/>}
                <button onClick={() => setFormType('register')}>I don't have an account</button>
            </div>

        )
    }
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path={'asset-pairs/'} element={<AssetPairsList/>}></Route>
                <Route path={'asset-pairs/:assetPairId/:assetPairName'} element={<AssetPairDetail/>}></Route>
            </Routes>
        </BrowserRouter>
    )

}

export default observer(App);

