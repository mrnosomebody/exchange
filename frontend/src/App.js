import React, {useContext, useEffect, useState} from "react"

import AssetPairsList from "./components/AssetPairsList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AssetPairDetail from "./pages/AssetPairDetail";
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import RegisterForm from "./components/RegisterForm";
import './styles/LoginForm.css'
import Navbar from './components/UI/Navbar/Navbar.jsx'
import About from "./components/About";


const App = function () {
    const {store} = useContext(Context)
    const [formType, setFormType] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.checkAuth()
        }
    }, [])

    if (!store.isAuthenticated) {
        return (
            <div className="form-centered">
                {
                    formType === true
                        ? <LoginForm/>
                        : <RegisterForm/>
                }
                <button onClick={() => setFormType(!formType)}>
                    {formType === true
                        ? "I don't have an account"
                        : "I have account"
                    }
                </button>
            </div>

        )
    }
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path={''} element={<About/>}></Route>
                <Route path={'asset-pairs/'} element={<AssetPairsList/>}></Route>
                <Route path={'asset-pairs/:assetPairId/:assetPairName'} element={<AssetPairDetail/>}></Route>
            </Routes>
        </BrowserRouter>
    )

}

export default observer(App);

