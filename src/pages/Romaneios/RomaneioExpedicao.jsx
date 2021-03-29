import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiShoppingCart } from "react-icons/fi";
import api from '../../api';
import '../../pages/Romaneios/romaneio.css';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

//mask
import { mask, unMask } from 'remask';

const initialValues = {
    'faccao': ''
}

export default props => {

    const [op, setOp] = useState([]);
    const [values, setValues] = useState({});
    const [data, setData] = useState([]);
    const [romaneio, setRomaneio] = useState([]);
    const [grade, setGrade] = useState([]);
    const [sequencia, setSequencia] = useState([]);
    const [footer, setFooter] = useState([]);
    const [modal, setModal] = useState('close');
    const [faccoes, setFaccoes] = useState([]);
    const [faccao, setfaccao] = useState(initialValues);
    const [seq, setSeq] = useState([]);
    const [generate, setGenerate] = useState('close');
    const [number, setNumber] = useState(null);
    const history = useHistory();

    let model = [];

    useEffect(() => {

        const op = prompt("Ordem de Produção: ");
        // const op = 308726;

        if (op === null) {
            return history.push('/romaneios');
        }

        async function checkOp(op) {
            try {
                const { data } = await api.get(`romaneios/check-op/${op}`);

                if (data != false) {
                    const ordem_producao = parseInt(data.ordemProducao);
                    setOp(ordem_producao);
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
                } else {
                    alert("Ordem de Produção invalida ou enexistente!");
                    const op = prompt("Ordem de Produção: ");
                    if (op === null) {
                        return history.push('/romaneios');
                    }
                    checkOp(op);
                }

            } catch (error) {
                alert("Ocorreu um erro ao buscar oa ordem de produção! /n Se o erro persistir, avise o admin");
            }
        }

        checkOp(op);

    }, []);

    /**
     * Função que seleciona a sequencia operacinal conforme selecionado
     * @param {*} e 
     */
    function handleSelectOne(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    /**
     * Função que salva o faccao_code quando selecionado 
     * @param {*} e 
     */
    function handleFaccao(e) {
        setfaccao(e.target.value);
    }

    function handleGrade(e) {
        const { name, value } = e.target;
        setSeq({ ...seq, [name]: value });
    }

    function open() {
        setModal('open');
        getFaccao();
    }

    /**
     * Função que busca um objeto de facções da API
     * @returns Array[]
     */
    async function getFaccao() {
        const response = await api.get('/faccoes/');
        setFaccoes(response.data);
    }

    function close() {
        setfaccao({ ['faccao']: '' });
        setModal('close');
    }

    function closeGenerate() {
        setGenerate('close');
    }

    /**
     * Função que mostra ou esconde a janela modal que mostra
     * uma lista de fações para selecionar 
     * @param {*} faccao 
     */
    function save(faccao) {
        if (faccao) {
            setModal('close');
            setGenerate('open');
        } else {
            alert('Para salvar é preciso escolher uma facção!');
        }
    }

    /**
     * Função que monta um JSON Stringfy e envia um 
     * Post para API
     * @return bollean
     */
    function handleGenerate() {

        const data_values = {
            'faccao_code': faccao,
            'ordem_producao': op,
            'grade': seq,
            'sequencia': values,
            'valor_faccao': number
        }

        const data_string = JSON.stringify(data_values);
        console.log(data_string)
        api.post('/romaneios/gerar-romaneio', data_string).then(({ data }) => {
            alert('Romaneio Gerado com Sucesso!');
            return history.push('/romaneios');
        }).catch(e => {
            console.log(e)
            return alert('Erro ao gerar romaneio...');
        });
    }

    const numberChange = e => {
        setNumber(mask(unMask(e.target.value), ['9,99', '99,99', '999,99', '9.999,99', '99.999,99']));
    }


    /**
     * Função que seleciona toda a lista de sequencia operacional
     * Caso a concição seja falsa e seta os values com a lista de Romaneios.
     * Caso true, desseleciona a lista e seta o values como {}
     */
    function selectAll() {

        let obj = {};
        let elements = document.querySelectorAll('#checkbox');

        const check = document.querySelector('#select_all');
        if (check.checked) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].checked = true;
                obj[elements[i].name] = elements[i].value
            }
            setValues(obj)
        } else {
            for (var i = 0; i < elements.length; i++) {
                elements[i].checked = false;
            }
            setValues({})
        }

    }

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
                            <FiShoppingCart className="box-body-icon" />
                            <span> > Romaneios Expedição - Ordem de Produção: <b>{romaneio.ordemProducao}</b></span>
                        </header>

                        <div className="box-tables">
                            <span className="tb-span"><b>Fornecedor: </b> Pacifico Sul Ind. Textil </span>
                            <span className="tb-span"><b>Data: </b> {new Date(romaneio.data).toLocaleDateString()}</span>
                            <span className="tb-span"><b>Referencia: </b> {romaneio.referencia}</span>
                            <span className="tb-span"><b>Descrição:</b> {romaneio.descricaoServico}</span>
                            <span className="tb-span"><b>Cor: </b> {romaneio.cor}</span>
                            <span className="tb-span"><b>Semana: </b> {romaneio.semana}</span>
                            <span className="tb-span"><b>O.S: </b> {romaneio.os}</span>
                            <span className="tb-span"><b>Quantidade: </b> {romaneio.quantidade}</span>
                            <span className="tb-span"><b>Valor: </b> {romaneio.valor}</span>
                            <span className="tb-span"><b>Tipo : </b> {romaneio.tipo}</span>
                        </div>

                        <div className="box-grade">
                            {(sequencia.length > 0) && (
                                <>
                                    <h3>Sequencia das Grades</h3>

                                    <ul className="grade-list-ul">

                                        {grade.map(item => {

                                            return (
                                                <li className="grade-list-li" key={item.id}>
                                                    <div className="grade-content">
                                                        <span className="item-grade">{item.grade}</span>
                                                        <span>{item.quantidade}</span>
                                                    </div>
                                                    <input type="checkbox" name={item.id} value={item.gradeCode} onChange={handleGrade} />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </>
                            )}

                            {(sequencia.length === 0) && (
                                <div className="warning">
                                    <h3>Nenhuma sequencia ou grade disponivel para seleção</h3>
                                </div>

                            )}

                        </div>

                        <div className="seq-list">
                            {(sequencia.length > 0) && (
                                <>
                                    <h3>Sequencia Operacional</h3>

                                    <div className="box-select-all">
                                        <input type="checkbox" name="select_all" id="select_all" onClick={selectAll} />
                                        <label htmlFor="select_all">Selecionar todos</label>
                                    </div>

                                    <ul className="box-list-ul">

                                        <div className="box-sequencia">
                                            <div className="box-space-19"></div>
                                            <div className="box-sequencia-span maquina"><b>Máquina</b></div>
                                            <div className="box-sequencia-span sequencia"><b>Seq</b></div>
                                            <div className="box-sequencia-span op"><b>Operação</b></div>
                                            <div className="box-sequencia-span pecas-hora"><b>Peças p/ Hora</b></div>
                                        </div>

                                        <form action="">
                                            {sequencia.map(item => {
                                                // console.log(item)
                                                return (
                                                    <li key={item.id} className="sequencia-li">
                                                        {/* <input type="checkbox" onChange={({ target:{cheacked} }) => onChange({target:{name:item.sequencia, value:item.referenceCode}})} id="status-1"  checked={1 === values.status} /> */}
                                                        <input type="checkbox" id="checkbox" name={item.sequencia} value={item.referenceCode} onChange={handleSelectOne} />
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
                                </>
                            )}
                        </div>

                        {(sequencia.length > 0) && (
                            <>
                                <div className="romaneio-footer">
                                    <span className="atencao"><b>{footer.atencao}</b></span>
                                    <span className="total-hora">{footer.totalPecasHora}</span>
                                </div>

                                <button className="modal-bt-faccao" onClick={open}>Selecionar Facção</button>Ï
                           </>
                        )}

                    </div>

                    {/* modal escolhe faccao */}
                    <div className={`modal ${modal}`}>
                        <div className="modal-main">
                            <button className="modal-bt-close" onClick={close}>X</button>
                            <header className="modal-header">
                                <b>Selecione uma Facção</b>
                            </header>
                            <div className="modal-box">
                                <ul className="modal-ul">
                                    {faccoes.length && faccoes.map(item => {
                                        return (
                                            <li className="modal-li" key={item.id}>
                                                <input type="radio" name="faccao" value={item.faccaoCode} onChange={handleFaccao} />
                                                <span><b>Facção: </b>{item.faccaoName}</span>
                                            </li>
                                        );
                                    })}
                                    <button className="modal-bt-save" onClick={save}>Salvar Facção</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* end modal */}

                    {/* generate */}
                    <div className={`modal ${generate}`}>
                        <div className="modal-gerar-romaneio">
                            <button className="modal-bt-close" onClick={closeGenerate}>X</button>
                            <header className="modal-header">
                                <b>Gerar Romaneio - O.P: {op} </b>
                            </header>

                            <div className="box-group">
                                <label htmlFor="valor-faccao" className="valor-faccao-label" >Valor Facção R$:</label>
                                <input type="text" id="valor-faccao" value={number} placeholder="00,00" name="valor_faccao" className="valor-faccao" onChange={numberChange} />
                            </div>

                            <button className="modal-bt-save" onClick={handleGenerate}>Salvar</button>
                        </div>
                    </div>
                    {/* end generate */}
                </div>

            </div>
        </>
    );

}