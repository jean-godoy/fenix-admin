import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus, FiUsers } from "react-icons/fi";
import api from '../../api';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import DateFullIn from '../../components/Date/DateFullIn';
import DateFullOut from '../../components/Date/DateFullOut';

const initialValues = {
    'faccao': ''
}

export default props => {

    const [values, setValues] = useState(initialValues);
    const [data, setData] = useState([]);
    const [romaneio, setRomaneio] = useState([]);
    const [grade, setGrade] = useState([]);
    const [sequencia, setSequencia] = useState([]);
    const [footer, setFooter] = useState([]);
    const [modal, setModal] = useState('close');
    const [faccao, setFaccao] = useState([]);
    const dateFullOut = DateFullIn(new Date());

    useEffect(() => {

        // const op = prompt("Ordem de Produção: ");

        const op = '315191';
        const ordem_producao = parseInt(op);
        if (ordem_producao !== null || ordem_producao !== "") {
            api.get(`/romaneios/get-romaneio/${ordem_producao}`).then(({ data }) => {
                setData(data);
                setRomaneio(data.romaneio);
                setGrade(data.grade);
                setSequencia(data.sequencia_operacional);
                setFooter(data.footer);
            }).catch(e => {
                console.log(data)
                return alert(e);
            });
        }
    }, []);

    function onChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    function open() {
        setModal('open');
        getFaccao();
    }

    async function getFaccao() {
        const response = await api.get('/faccoes');
        setFaccao(response.data);
    }

    function close() {
        setValues({ ...values, ['faccao']: '' });
        setModal('close');
    }

    function save()
    {
        if(values.faccao.length > 0)
        {
            alert('Facção Salva com sucesso!')
            setModal('close');  
        } else {
            alert('Para salvar é preciso escolher uma facção!');
        }
        
    }

    console.log(values);
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
                            <FiUsers className="box-body-icon" />
                            <span> > Romaneios - Expedição - Ordem de Produção: <b>{romaneio.ordemProducao}</b></span>
                        </header>

                        <div className="box-tables">
                            <span className="tb-span"><b>Fornecedor: </b> Pacifico Sul Ind. Textil </span>
                            <span className="tb-span"><b>Data: </b> {romaneio.data}</span>
                            <span className="tb-span"><b>Referencia:</b> {romaneio.referencia}</span>
                            <span className="tb-span"><b>Descrição:</b> {romaneio.descricaoServico}</span>
                            <span className="tb-span"><b>Cor: </b> {romaneio.cor}</span>
                            <span className="tb-span"><b>Semana: </b> {romaneio.semana}</span>
                            <span className="tb-span"><b>O.S: </b> {romaneio.os}</span>
                            <span className="tb-span"><b>Quantidade: </b> {romaneio.quantidade}</span>
                            <span className="tb-span"><b>Valor: </b> {romaneio.valor}</span>
                            <span className="tb-span"><b>Tipo : </b> {romaneio.tipo}</span>
                        </div>

                        <div className="box-grade">
                            <h3>Sequencia das Grades</h3>

                            <ul className="grade-list-ul">
                                {grade.length && grade.map(item => {

                                    return (
                                        <li className="grade-list-li" key={item.id}>
                                            <div className="grade-content">
                                                <span className="item-grade">{item.grade}</span>
                                                <span>{item.quantidade}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>

                        </div>

                        <div className="seq-list">
                            <h3>Sequencia Operacional</h3>
                            <ul className="box-list-ul">

                                <div className="box-sequencia">
                                    <div className="box-space-19"></div>
                                    <div className="box-sequencia-span maquina"><b>Máquina</b></div>
                                    <div className="box-sequencia-span sequencia"><b>Seq</b></div>
                                    <div className="box-sequencia-span op"><b>Operação</b></div>
                                    <div className="box-sequencia-span pecas-hora"><b>Peças p/ Hora</b></div>
                                </div>

                                <form action="">
                                    {sequencia.length && sequencia.map(item => {
                                        // console.log(item)
                                        return (
                                            <li key={item.id} className="sequencia-li">
                                                {/* <input type="checkbox" onChange={({ target:{cheacked} }) => onChange({target:{name:item.sequencia, value:item.referenceCode}})} id="status-1"  checked={1 === values.status} /> */}
                                                <input type="checkbox" name={item.sequencia} value={item.referenceCode} onChange={onChange} />
                                                <div className="box-sequencia">
                                                    <div className="box-sequencia-span maquina"><b>{item.maquina}</b></div>
                                                    <div className="box-sequencia-span sequencia">{item.sequencia}</div>
                                                    <div className="box-sequencia-span op">{item.operacao}</div>
                                                    <div className="box-sequencia-span pecas-hora">{item.pecasHora}</div>
                                                </div>

                                            </li>
                                        );
                                    })}
                                </form>
                            </ul>
                        </div>

                        <div className="romaneio-footer">
                            <span className="atencao"><b>{footer.atencao}</b></span>
                            <span className="total-hora">{footer.totalPecasHora}</span>
                        </div>

                        <button className="modal-bt-faccao" onClick={open}>Selecionar Facção</button>

                    </div>
                    <div className={`modal ${modal}`}>

                        <div className="modal-main">
                            <button className="modal-bt-close" onClick={close}>X</button>
                            <header className="modal-header">
                                <b>Selecione uma Facção</b>
                            </header>

                            <div className="modal-box">

                                <ul className="modal-ul">
                                    
                                    {faccao.length && faccao.map(item => {
                                        return(
                                            <li className="modal-li" key={item.id}>
                                                <input type="radio" name="faccao" value={item.faccaoCode} onChange={onChange} />
                                                <span><b>Facção: </b>{item.faccaoName}</span>
                                            </li>
                                        );
                                    })}

                                    <button className="modal-bt-save" onClick={save}>Salvar Romaneio</button>

                                </ul>       

                            </div>


                        </div>

                    </div>

                </div>

            </div>
        </>
    );

}