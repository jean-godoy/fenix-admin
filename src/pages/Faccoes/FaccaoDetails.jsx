import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import api from '../../api';


//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

import { mask, unMask } from 'remask';

export default props => {

    const id = props.match.params.id;
    const [data, setData] = useState([]);

    //maskers
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        api.get(`/faccao-id/${id}`).then(({ data }) => {
            setData(data);
            setCpf(mask(unMask(data.cpf), ['999.999.999-99']));
            setPhone(mask(unMask(data.phone), ['(99) 9999-9999', '(99) 9 9999-9999']));
        }).catch(e => {
            return alert('Nenhuma Faccção corresponde está id');
        });
    }, []);

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Facçaõ Detalhes</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/faccoes">Facções</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="faccao-add">Adicionar Facção</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Dados da Facção: {data.faccao_name}</span>
                        </header>

                        <div className="box-data">

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Facção: </b>{data.faccao_name}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Telefone: </b>{phone}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Endereço: </b>{data.street}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>CPF: </b>{cpf}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Conta bancária: </b>{data.bank}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Funcionários: </b>{data.employees}
                                </span>
                            </div>

                        </div>

                        <div className="btn-group">
                            <Link className="button" to={`/faccao-edit/${id}`}>Editar</Link>
                            <Link className="button" to="/faccoes">OK</Link>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
