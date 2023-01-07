import React, {Component, useState, useEffect} from "react"
import {AuthContext, refreshAccessToken} from './context/AuthContext';
import {Routes, Route, Router} from 'react-router-dom';
import axios from "axios";

import LoginForm from './components/LoginForm';
import AssetPairList from "./components/AssetPairList";
import AssetPairPage from "./components/AssetPairPage"

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            refreshAccessToken();
            const config = error.config;
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
            return axios(config);
        }
        return Promise.reject(error);
    }
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            activeItem: {
                base_asset: {
                    name: '',
                    symbol: '',
                    type: ''
                },
                quote_asset: {
                    name: '',
                    symbol: '',
                    type: ''
                }
            },
            assetPairs: []
        };
    }

    setIsAuthenticated = (isAuthenticated) => {
        this.setState({isAuthenticated});
    }

    render() {
        const {isAuthenticated} = this.state;
        return (
            <main className="content">
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <AssetPairList/>
                            {/*<Router>*/}
                            {/*    <Routes>*/}
                            {/*        <Route path='/contact' element={<AssetPairPage/>}/>*/}
                            {/*    </Routes>*/}
                            {/*</Router>*/}


                        </div>
                    </div>
                </div>
            </main>

        )
    }
}

export default App;

