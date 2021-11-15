import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrendingUp } from "react-icons/fi";
import api from '../../api';
import './financeiro.css';
import '../../components/Pikasso/Global.css';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

//services
import { teste, Financeiro } from './../../services/financeiro_service';

export default props => {

    const [show, setShow] = useState('show');
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState('modal-visible');
    const [modalText, setModalText] = useState('');
    const nfe = props.match.params.nfe;
    const history = useHistory();

    useEffect(() => {
        api.get(`/financeiro/get-payrolls-reffering-to/${nfe}`).then(({ data }) => {
            setData(data);
        })
    }, []);

    const visible = () => {
        setShow(null)
    }

    const close = () => {
        setShow('show')
    }

    function ModalPayroll(data) {
        console.log(data.props)
        const props = data.props;
        const op = props.ordem_producao;
        return (
            <div className={`box-modal-payroll ${show}`}>
                <div className="modal-content">
                    <header className="modal-header">
                        Facção: {props.faccao_nome}
                        <button className="bt-close" onClick={close}>X</button>
                    </header>
                    <div className="modal-body">
                        <table >
                            <tr>
                                <th>NFE </th>
                                <td>{props.nfe}</td>
                            </tr>
                            <tr>
                                <th>O.P.</th>
                                <td>{props.ordem_producao}</td>
                            </tr>
                            <tr>
                                <th>Referencia </th>
                                <td>{props.ref}</td>
                            </tr>
                            <tr>
                                <th>Desc. Serviço </th>
                                <td>{props.desc_servico}</td>
                            </tr>
                            <tr>
                                <th>Quantidade </th>
                                <td>{props.quantidade}</td>
                            </tr>
                            <tr>
                                <th>Data Entrega </th>
                                <td>{props.data_entrega}</td>
                            </tr>
                            <tr>
                                <th>Valor Facção </th>
                                <td>R$:{props.preco}</td>
                            </tr>
                            <tr>
                                <th>Valor Total </th>
                                <td>R$:{props.valor_total}</td>
                            </tr>
                            <tr>
                                <th>Data Pagamento </th>
                                <td>{props.data_pagamento}</td>
                            </tr>
                        </table>

                        <div className="modal-bt-group">
                            <button onClick={() => updateStatus(op)} >Adiantar Pagamento</button>
                            <button onClick={close} >OK</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }


    /**
     * Funcçao que gera as tabelas
     * @returns Table
     */
    function Table() {

        if (data.length) {
            return (
                <table className="tabela-payroll" border="0" cellpadding="0" cellspacing="0" >
                    <thead className="payroll-thead">
                        <tr>
                            <th>NFE</th>
                            <th>Facção</th>
                            <th>O.P.</th>
                            <th>Ref.</th>
                            <th>Desc. Serviço</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                            <th>Total</th>
                            <th>Pagamento</th>
                            <th>+</th>
                        </tr>
                    </thead>
                    <tbody className="payroll-tbody">
                       
                            {data.map(item => {
                            const info = item;
                                return (
                                    <tr>
                                        <td>{item.nfe}</td>
                                        <td key={item.id}>{item.faccao_nome}</td>
                                        <td>{item.ordem_producao}</td>
                                        <td>{item.ref}</td>
                                        <td>{item.desc_servico}</td>
                                        <td>{item.quantidade}</td>
                                        <td>R$:{item.preco}</td>
                                        <td>R$:{item.valor_total}</td>
                                        <td>{item.data_pagamento}</td>
                                        <td><Link onClick={visible}>...</Link></td>
                                        <ModalPayroll props={item} />
                                    </tr>
                                )
                            })}
                        
                    </tbody>
                </table>
            );
        } else {
            return <div className="message">Nehum pagamento registrado no momento.</div>
        }
    }

    /**
     * Componente de modal, recebe o texo a ser exibido como parametro
     * @param {*} data 
     * @returns 
     */
    const Modal = data => {

        return (
            <div className={`box-modal-global ${modalVisible} `}>
                {modalText}
            </div>
        );
    }

    const executeModal = () => {
        setModalVisible('');
        setModalText('Pagamento realizado com sucesso!');
        setTimeout(() => {
            setModalVisible('modal-visible');
            history.push('/financeiro');
        }, 3000);
        
    }

    function updateStatus(op = 123) {

        api.patch(`/financeiro/update-status-payroll/${op}`).then(({ data }) => {
            console.log(data)
            if (data) {
                executeModal();
            }
        })
    }

    return (
        <>
            <Menu />

            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Financeiro </header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/financeiro">Financeiro</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiTrendingUp className="box-body-icon" />
                            <span> > Pagamentos referente a NFE: <b>{nfe}</b></span>
                        </header>

                        <div className="">
                            <Table />
                        </div>
                    </div>

                </div>
                <Modal />
            </div>

        </>
    );

}