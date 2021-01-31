import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFolderPlus, FiMoreHorizontal } from "react-icons/fi";
import api from '../../api';
import './romaneio.css';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/romaneios/list').then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhum Romaneio Encontrado!');
        });
    }, []);

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Romaneios</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/romaneios">Romaneios</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/romaneio/expedicao">Expedição</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiFolderPlus className="box-body-icon" />
                            <span> > Selecione um Romaneio</span>
                        </header>

                        {/* <div className="box-list"> */}

                        <table className="box-table">
                            <tr>
                                <td className="table-n-controle"> <b>N.C.</b> </td>
                                <td className="table-faccao"><b>Facção</b></td>
                                <td className="table-ref"><b>REF</b></td>
                                <td className="table-desc"><b>Descrição</b></td>
                                <td className="table-op"><b>OP</b></td>
                                <td className="table-qnt"><b>QNT</b></td>
                                <td className="table-semana"><b>Semana</b></td>
                                <td className="table-dias"><b>Dias em Prod.</b></td>
                                <td className="table-status"><b>Status</b></td>
                                <td className="table-more"><FiMoreHorizontal className="box-body-icon" color="#efefef" /></td>
                            </tr>

                            {data.length && data.map(item => {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.faccao_name}</td>
                                        <td>{item.referencia}</td>
                                        <td>{item.descricao_servico}</td>
                                        <td>{item.ordem_producao}</td>
                                        <td>{item.quantidade}</td>
                                        <td>{item.semana}</td>
                                        <td>12</td>
                                        <td>1</td>
                                        <Link className="table-link" to={`/romaneios/show/${item.romaneio_code}`}><td><FiMoreHorizontal className="box-body-icon" /></td></Link>
                                    </tr>
                                );
                            })}

                        </table>

                    </div>

                </div>

            </div>
        </>
    );

}