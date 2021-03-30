import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFolderPlus, FiMoreHorizontal } from "react-icons/fi";
import api from '../../api';
import './romaneio.css';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

import dateDiff from '../../components/Date/DateDiff';

export default props => {

    const [data, setData] = useState([]);
    const nfe = props.match.params.nfe

    useEffect(() => {
        api.get(`/romaneios/get-romaneios-by-nfe/${nfe}`).then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhum Romaneio Encontrado!');
        });
    }, []);
    // console.log(data)
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
                            <span> > Romaneios referentes a NF-e: <b>{nfe}</b> </span>
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
                                {/* <td className="table-more"><FiMoreHorizontal className="box-body-icon" color="#efefef" /></td> */}
                            </tr>

                            {data.map(item => {
                                let faccao_status = item.faccao_status;
                                let style = "yellow";

                                if (faccao_status) {
                                    style = "green"
                                }

                                return (
                                    <tr>
                                        <td className={` ${style}`}>{item.id}</td>
                                        <td className={`${style}`}>{item.faccao_name}</td>
                                        <td className={`${style}`}>{item.referencia}</td>
                                        <td className={`${style}`}>{item.descricao_servico}</td>
                                        <td className={`${style}`}>{item.ordem_producao}</td>
                                        <td className={`${style}`}>{item.quantidade}</td>
                                        <td className={`${style}`}>{item.semana}</td>
                                        <td className={`${style}`}>{dateDiff(item.iniciado)}</td>
                                        <td className={`${style}`}>{item.faccao_status}</td>
                                        {/* <Link className="table-link" to={`/romaneios/show/${item.romaneio_code}`}><td><FiMoreHorizontal className="box-body-icon" /></td></Link> */}
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