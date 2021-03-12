import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar } from "react-icons/fi";
import api from '../../api';
import '../../components/Pikasso/tables.css';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

//mask
import { mask, unMask } from 'remask';

export default props => {

    const [data, setData] = useState([]);
    const [entrega, setEntrega] = useState('');
    const [pagamento, setPagamento] = useState('');

    useEffect(() => {
        api.get('/financeiro/show').then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhum Romaneio Encontrado!');
        });
    }, []);

    const dataEntrega = e => {
        setEntrega(mask(unMask(e.target.value), ['99/99/9999']));
    }

    const dataPagamento = e => {
        setPagamento(mask(unMask(e.target.value), ['99/99/9999']));
    }

    const handPost = () => {
        const data_value = {
            'data_entrega': entrega,
            'data_pagamento': pagamento
        }

        const data_string = JSON.stringify(data_value);
        
        api.post('/financeiro/adicionar-pagamento', data_string).then( ({data}) => {
            alert(data)
        }).catch( e => {
            alert('Ocorreu algum erro ao salvar o registro!');
        })
    }

    function Table() {
        // console.log(data)
        if(data.error === false){
            return <div className="error"><strong>Nenhuma data de pagamento cadastrada!</strong></div>
        }

        return (
            <table className="tabela-pagamentos" border="0" cellpadding="0" cellspacing="0" >
                <thead className="pagamentos-thead">
                    <tr width="100%">
                        <th width="100%">Data de Entrega</th>
                        <th>Data de Pagamento</th>
                    </tr>
                </thead>
                <tbody className="pagamentos-thead">
                    <tr>
                        <td>
                            17/12/2021
                                    </td>
                        <td>
                            23/12/2021
                                    </td>
                    </tr>
                </tbody>
            </table>
        );

    }

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

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiCalendar className="box-body-icon" />
                            <span> > Tabela de Pagamentos</span>
                        </header>

                        <div className="box-container-table">
                            <Table />

                            <div className="box-add-pagamento">

                                <div className="pagamento-head">
                                    <strong>Adicionar data de pagamento</strong>
                                </div>

                                <div className="pagamento-group">
                                    <label htmlFor="data-entrega">Data de Entrega: </label>
                                    <input type="text" id="data-entraga" name="data-entraga" value={entrega} onChange={dataEntrega} placeholder="00/00/0000" />
                                </div>

                                <div className="pagamento-group">
                                    <label htmlFor="data-pagamento">Data de Entrega: </label>
                                    <input type="text" id="data-pagamento" name="data-pagamento" value={pagamento} onChange={dataPagamento} placeholder="00/00/0000" />
                                </div>

                                <button className="pagamento-btn" onClick={handPost} >Adicionar</button>

                            </div>

                        </div>
                    </div>


                </div>

            </div>


        </>
    );

}