import React, {useContext, useEffect, useState} from "react"

import AssetPairsList from "./components/AssetPairsList";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AssetPairDetail from "./pages/AssetPairDetail";
import Navbar from "./components/UI/Navbar/Navbar";
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import DefaultButton from "./components/UI/button/DefaultButton";
import {observer} from "mobx-react-lite";

const App = function () {
    const {store} = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.checkAuth()
        }
    }, [])

    if (!store.isAuthenticated) {
        return (
            <LoginForm/>
        )
    }
    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path={'asset-pairs/'} element={<AssetPairsList/>}></Route>
                <Route path={'asset-pairs/:assetPairId/:assetPairName'} element={<AssetPairDetail/>}></Route>
            </Routes>
        </BrowserRouter>
    )

}

export default observer(App);

