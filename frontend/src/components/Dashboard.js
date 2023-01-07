import React, {useContext} from 'react';
import {AuthContext, removeAuthToken} from '../context/AuthContext';

const Dashboard = () => {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    const handleLogout = () => {
        removeAuthToken();
        setIsAuthenticated(false);
    };

    return (
        <div>
            <p>Welcome to the dashboard</p>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
};

export default Dashboard;
