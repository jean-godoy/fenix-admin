import React, { useState, useEffect } from 'react';
import './header.css';
import { FiBell, FiMail } from 'react-icons/fi';

export default props => {

    const user_data = localStorage.getItem('@friday_user_data');
    const [user, setUser] = useState([]);

    useEffect(() => {
        if(user_data !== null)
    {
        const json = JSON.parse(user_data);
        let user_name = json.user_name;
        setUser(user_name);
    } 
    },[])

    return (
        <header className="container-header">
            <span className="header-inc-name"><b>Fenix Facções</b></span>
            <div className="box-header">
                <span className="header-user"><b> {user} </b></span>
                <FiMail className="header-bell" color="black" size="25" />
                <FiBell className="header-bell" color="black" size="25" />
            </div>
        </header>
    );
}