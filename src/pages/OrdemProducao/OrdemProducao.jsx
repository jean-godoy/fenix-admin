import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from "react-icons/fi";
import api from '../../api';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/romaneios/').then(({data}) => {
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

                    <header>Gerar O.P.</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/ordem-producao">Ordem Produção</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Selecione uma O.P.</span>
                        </header>

                        <div className="box-list">
                            <ul className="box-list-ul">
                                {/* {data.length && data.map(item => {
                                    return (
                                        <li key={item.id} className={`box-list-li status-${item.status}`}>
                                            <Link className="box-list-link" to={`/ordem-producao-add/${item.os}`} >
                                                <span className="box-list-span"><b>O.P: </b>{item.os} </span>
                                            </Link>
                                        </li>
                                    )
                                })} */}
                            </ul>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );

}