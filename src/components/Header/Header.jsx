import React, { useState, useEffect } from 'react';
import './header.css';
import { FiBell, FiMail } from 'react-icons/fi';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
       const req = JSON.parse(localStorage.getItem('@friday_user_data'));
       setData(req);
    }, [])

    return(
        <header className="container-header">
            <span className="header-inc-name"><b>Fenix Facções</b></span>
            <div className="box-header">
            <span className="header-user"><b>{data.user_name}</b></span>
               <FiMail className="header-bell" color="black" size="25"/>
               <FiBell className="header-bell" color="black" size="25"/>
            </div>
        </header>
    );
}