import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import api from '../../api';


//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const id = props.match.params.id;
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get(`/employee-id/${id}`).then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhum funcionário corresponde está id');
        });
    }, []);

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Funcionário Detalhes</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/employees">Funcionários</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/employee-add">Adicionar Funcionários</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Dados do Funcionário:</span>
                        </header>

                        <div className="box-data">

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Nome: </b>{data.employee_name}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Telefone: </b>{data.phone}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Endereço: </b>{data.address}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>CPF: </b>{data.cpf}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>RG: </b>{data.rg}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Data Nasc: </b>{data.birth_date}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Cidade: </b>{data.city}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Estado: </b>{data.state}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>E-mail: </b>{data.email}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Função: </b>{data.office}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Salário: </b>{data.salary}
                                </span>
                            </div>

                        </div>

                        <div className="btn-group">
                            <Link className="button" to={`/employee-edit/${id}`}>Editar</Link>
                            <Link className="button" to="/user">OK</Link>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
