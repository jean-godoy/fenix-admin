import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from "react-icons/fi";
import api from '../../api';
import './user.css';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/users/').then(({ data }) => {
            setData(data);
        }).catch(e => {
            console.log(e);
        });
    }, []);
    
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Usuarios</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/user">Usuarios</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/user-add">Adicionar Usuario</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Selecione um Usuario</span>
                        </header>

                        <div className="box-list">
                            <ul className="box-list-ul">
                                {data.map(item => {
                                    return (
                                        <li key={item.id_user} className="box-list-li">
                                            <Link className="box-list-link" to={`/user-details/${item.id}`} >
                                                <span className="box-list-span"><b>Nome: </b>{item.userName} </span>
                                               
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}