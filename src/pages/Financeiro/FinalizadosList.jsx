import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFolderPlus, FiMoreHorizontal } from "react-icons/fi";
import api from '../../api';
import './financeiro.css';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);
    const nfe = props.match.params.nfe;

    useEffect(() => {
        api.get(`/romaneios/financeiro-finalizados-lista/${nfe}`).then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhum Romaneio Encontrado!');
        });
    }, []);

    function setStatus(status) {
        let res = 'Débito';
        if(status === 1) {
            res = 'Compensado';
        }
        return res;
    } 

    console.log(data)
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Financeiro</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/financeiro">Financeiro</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/tabela-pagamentos">Tabela de Pagamentos</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/financeiro-finalizados">Finalizados</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiFolderPlus className="box-body-icon" />
                            <span> > Lista de Romaneios Finalizados </span>
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
                                <td className="table-semana"><b>Valor Facção</b></td>
                                <td className="table-dias"><b>Total</b></td>
                                <td className="table-status"><b>Status</b></td>
                                {/* <td className="table-more"><FiMoreHorizontal className="box-body-icon" color="#efefef" /></td> */}
                            </tr>

                            {data.length && data.map(item => {
                                let faccao_status = item.faccao_status;
                                let style = "yellow";

                                if (faccao_status) {
                                    style = "green"
                                }

                                function Total() {
                                    let valorTotal = 0;
                                    valorTotal += Number(item.quantidade) * Number(item.valor_faccao);
                                    
                                    return valorTotal.toFixed(2).replace('.', ',');
                                }

                                function Format() {
                                    let valorFacccao = Number(item.valor_faccao);
                                    return valorFacccao.toFixed(2).replace('.', ',');
                                }

                                return (
                                    <tr className={`status-${item.statusPagamento}`}>
                                        <td className={` ${style}`}>{item.id}</td>
                                        <td className={`${style}`}>{item.faccaoNome}</td>
                                        <td className={`${style}`}>{item.ref}</td>
                                        <td className={`${style}`}>{item.descServico}</td>
                                        <td className={`${style}`}>{item.ordemProducao}</td>
                                        <td className={`${style}`}>{item.quantidade}</td>
                                        <td className={`${style}`}>R$: {item.preco}</td>
                                        <td className={`${style}`}>R$: {item.valorTotal}</td>
                                        <td className={`${style}`}>{setStatus(item.statusPagamento)}</td>
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