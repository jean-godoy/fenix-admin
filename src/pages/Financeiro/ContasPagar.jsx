import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp } from "react-icons/fi";
import api from '../../api';
import './financeiro.css'

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);

    
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Financeiro </header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/financeiro">Financeiro</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiTrendingUp className="box-body-icon" />
                            <span> > Contas a Pagar</span>
                        </header>

                        
                    </div>

                </div>

            </div>
        </>
    );

}