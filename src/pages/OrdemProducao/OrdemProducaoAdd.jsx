import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';


//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

const initialValues = {
    fornecedor: '',
    data_in: '',
    referencia: '',
    cor: '',
    desc_servico: '',
    semana: '',
    os: '',
    quantidade: '',
    preco_unitario: '',
    tipo: ''
}

export default props => {

    const ordem_prod = props.match.params.id;
    const [data, setData] = useState(initialValues);
    // const dateFullIn = DateFullIn(new Date());
    const [op, setOp] = useState(null);
    const [nfe, setNfe] = useState(null);
    const history = useHistory();

    function onChange(e) {
        const { name, value } = e.target;
        setData({...data, [name]:value});
    }

    const handOPp = (e) => setOp(e.target.files[0]);

    const handNfe  = (e) => setNfe(e.target.files[0]);

    function sendData(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append('op', ordem_prod);
        formData.append('fornecedor', data.fornecedor);
        // formData.append('data_in', data.data_in);
        formData.append('referencia', data.referencia);
        formData.append('cor', data.cor);
        formData.append('desc_servico', data.desc_servico);
        formData.append('semana', data.semana);
        formData.append('os', data.os);
        formData.append('quantidade', data.quantidade);
        formData.append('preco_unitario', data.preco_unitario);
        formData.append('tipo', data.tipo);
        formData.append('op_file', op);
        formData.append('xml_file', nfe);
        
        // console.log(formData)    
        api.post('/generate-op/upload', formData).then(({data}) => {
            alert('OK');
            return history.push(`/grade-add/${ordem_prod}`);
        }).catch( e => {
            console.log(e);
            return alert('Ops, ocorreu algum erro..' + e )
        })

    }
    
    return(
        <>
            <Menu />
            <div className="container">

                <Header />
                
                <div className="box-main">

                    <header>Ordem Produção</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/ordem-producao">Ordem Produção</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUserPlus className="box-body-icon" />
                            <span> > Nova Ordem Produção</span>
                        </header>

                        <form onSubmit={sendData} className="box-form">

                            <div className="form-group">
                                <label htmlFor=""><b>O.P:</b></label>
                                <input type="text" className="form-input" name="op" value={ordem_prod} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Fornecedor:</b></label>
                                <input type="text" className="form-input" name="fornecedor" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Data Entrada:</b></label>
                                <input type="text" className="form-input" name="data_in" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Referencia:</b></label>
                                <input type="text" className="form-input" name="referencia" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Cor:</b></label>
                                <input type="text" className="form-input" name="cor" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Des. Serviço:</b></label>
                                <input type="text" className="form-input" name="desc_servico" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Semana:</b></label>
                                <input type="text" className="form-input" name="semana" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>O.S:</b></label>
                                <input type="text" className="form-input" name="os" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Quantidade:</b></label>
                                <input type="text" className="form-input" name="quantidade" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Preço Unitario:</b></label>
                                <input type="text" className="form-input" name="preco_unitario" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>tipo:</b></label>
                                <input type="text" className="form-input" name="tipo" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Arquivo O.P:</b></label>
                                <input type="file" className="form-input" name="op_file" onChange={handOPp} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Arquivo NF-e:</b></label>
                                <input type="file" className="form-input" name="nfe_file" onChange={handNfe} required />
                            </div>

                            <div className="btn-group">
                                <Link className="button" to="/ordem-producao">Cancelar</Link>
                                <button className="button" type="submit">Gerar Ordem</button>
                            </div>

                        </form>
                    </div>

                </div>
                {/* box main */}

            </div>
        </>
    );
}