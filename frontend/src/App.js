import React from "react"

import AssetPairsList from "./components/AssetPairsList";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AssetPairDetail from "./pages/AssetPairDetail";
import Navbar from "./components/UI/Navbar/Navbar";

const App = function () {
    const assetPair = (currentPair) => {

    }

    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route path={'asset-pairs/'} element={<AssetPairsList assetPair={assetPair}/>}></Route>
                <Route path={'asset-pairs/:assetPairId'} element={<AssetPairDetail/>}></Route>
            </Routes>

        </BrowserRouter>
    )
}

export default App;

