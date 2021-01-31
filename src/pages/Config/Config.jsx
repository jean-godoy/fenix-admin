import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText } from "react-icons/fi";
import api from '../../api';
import './config.css';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/api/status').then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhuma NF-e Liberada!');
        });
    }, []);
    
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Configurações</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/ordem-producao">Configurações</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiFileText className="box-body-icon" />
                            <span> > Menu</span>
                        </header>

                       <div className="box-config">
                            <Link className="config-link" to="/configurações/status">Status</Link>
                            <Link className="config-link" to="/configurações/status">Settings</Link>
                       </div>

                    </div>

                </div>

            </div>
        </>
    );

}