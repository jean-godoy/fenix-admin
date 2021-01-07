import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import api from '../../api';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {
    const id = props.match.params.id;
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get(`/providers/get-id/${id}`).then(({ data }) => {
            setData(data);
        }).catch(e => {
            alert('Erro, Nenhum Fornecedor Correspondente');
        });
    }, []);

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Fornecedores Detalhes</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/providers">Fornecedores</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/provider-add">Adicionar Fornecedor</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Dados do Fornecedor:</span>
                        </header>

                        <div className="box-data">

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Nome: </b>{data.providerName}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>CNPJ/CPF: </b>{data.cnpj}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Endereço: </b>{data.street}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Bairro/Distrito: </b>{data.district}
                                </span>
                            </div>

                             <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>CEP: </b>{data.cep}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Município: </b>{data.city}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Fone/Fax: </b>{data.phone}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Estado: </b>{data.uf}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Inscrição Estadual: </b>{data.subscription}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}