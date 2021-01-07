import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import api from '../../api';



//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

import pdf_file from '../../pages/PDF/model.pdf';

export default props => {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/almoxarifados/').then(({data}) => {
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

                    <header>Almoxarifados</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/almoxarifado">Produtos</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/almoxarifado-add">Adicionar Produto</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Produtos</span>
                        </header>

                        <div className="box-list">
                            <ul className="box-list-ul">
                                {data.length && data.map(item => {
                                    return (
                                        <li key={item.id_provider} className="box-list-li">
                                            <Link className="box-list-link" to={`/almoxarifado-details/${item.id}`} >
                                                <span className="box-list-span"><b>Produto: </b>{item.produto} </span>
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