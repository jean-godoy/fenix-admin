import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus, FiUsers } from "react-icons/fi";
import api from '../../api';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import DateFullIn from '../../components/Date/DateFullIn';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/providers').then(({data}) => {
            setData(data);
        }).catch(e => {
            return alert('Erro ao Cadastrar Fornecedor');
        });
    },[]);

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Liberação de Carga</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/cheking">Gargas</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/check-add">Adicionar Carga</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Selecione uma Carga</span>
                        </header>

                        <div className="box-list">
                            <ul className="box-list-ul">
                                {data.length && data.map(item => {
                                    return (
                                        <li key={item.id_provider} className="box-list-li">
                                            <Link className="box-list-link" to={`/provider-details/${item.id_provider}`} >
                                                <span className="box-list-span"><b>Carga: </b>{item.name} </span>
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