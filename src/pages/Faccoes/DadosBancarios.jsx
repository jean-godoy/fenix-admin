import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import api from '../../api';


//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

import { mask, unMask } from 'remask';

export default props => {

    const faccao_code = props.match.params.faccao_code;
    const [data, setData] = useState([]);
    const [form, setForm] = useState({});

    //maskers
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        api.get(`/api/bank-data/get-data/${faccao_code}`).then(({ data }) => {
            setData(data);
            // setCpf(mask(unMask(data.cpf), ['999.999.999-99']));
            // setPhone(mask(unMask(data.phone), ['(99) 9999-9999', '(99) 9 9999-9999']));
        }).catch(e => {
            console.log(e);
            // return alert('Nenhuma Faccção corresponde está id');
        });
    }, []);

    const handleCpf = e => {
        setCpf(mask(unMask(e.target.value), ['999.999.999-99', '99.999.999/9999-99']));
    };

    function onChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]:value });
    }

    function onSubmit(e) {
        e.preventDefault();

        const data_values = {
            faccao_code: faccao_code,
            nome_titular: form.nome_titular,
            cpf_titular: unMask(cpf),
            banco: form.banco,
            agencia: form.agencia,
            conta: form.conta
        }

        const data_string = JSON.stringify(data_values);

        api.post('/api/bank-data/create', data_string).then( (data) => {
            console.log(data);
        }).catch( e => {
            return console.log(e);
        })
    }
    console.log(data)
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Dados Bancarios</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/faccoes">Voltar</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to={`/faccoes/dados-bancarios/${faccao_code}`}>Dados Bancarios</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to={`/faccoes/forma-pagamento/${faccao_code}`}>Forma de Pagamento</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Dados do Banco: {(data !== null) ? data.banco : "Cadastrar Dados Bancários"}</span>
                        </header>

                        {data !== null && (
                            <div className="box-data">

                                <div className="box-data-group">
                                    <span className="data-group-span">
                                        <b>Nome do Titular: </b>{data.nomeTitular}
                                    </span>
                                </div>

                                <div className="box-data-group">
                                    <span className="data-group-span">
                                        <b>CPF/CNPJ do Titular: </b>{data.cpfTitular}
                                    </span>
                                </div>

                                <div className="box-data-group">
                                    <span className="data-group-span">
                                        <b>Banco: </b>{data.banco}
                                    </span>
                                </div>

                                <div className="box-data-group">
                                    <span className="data-group-span">
                                        <b>Agencia: </b>{data.agencia}
                                    </span>
                                </div>

                                <div className="box-data-group">
                                    <span className="data-group-span">
                                        <b>Conta: </b>{data.conta}
                                    </span>
                                </div>

                                <div className="btn-group">
                                    {/* <Link className="button" to={`/faccao-edit/${id}`}>Editar</Link> */}
                                    <Link className="button" to="/faccoes">OK</Link>
                                </div>

                            </div>
                        )}

                        {(data === null) && (
                               <form onSubmit={onSubmit} className="box-form">

                               <div className="form-group">
                                   <label htmlFor=""><b>Nome do Titular:</b></label>
                                   <input type="text" className="form-input" name="nome_titular" onChange={onChange} required />
                               </div>
   
                               <div className="form-group">
                                   <label htmlFor=""><b>CPF de Titular:</b></label>
                                   <input type="text" className="form-input" name="cpf_titular" value={cpf} onChange={handleCpf} required />
                               </div>
   
                               <div className="form-group">
                                   <label htmlFor=""><b>Banco:</b></label>
                                   <input type="text" className="form-input" name="banco" onChange={onChange} required />
                               </div>
   
                               <div className="form-group">
                                   <label htmlFor=""><b>Agencia:</b></label>
                                   <input type="text" className="form-input" name="agencia" onChange={onChange} required />
                               </div>
   
                               <div className="form-group">
                                   <label htmlFor=""><b>Conta:</b></label>
                                   <input type="text" className="form-input" name="conta" onChange={onChange} required />
                               </div>
   
                               {/* <div className="form-group">
                                   <label htmlFor=""><b>Telefone:</b></label>
                                   <input type="text" className="form-input" name="phone" value={phone} onChange={phoneChange} required />
                               </div>
   
                               <div className="form-group">
                                   <label htmlFor=""><b>Endereço:</b></label>
                                   <input type="text" className="form-input" name="street" onChange={onChange} required />
                               </div>
   
                               <div className="form-group">
                                   <label htmlFor=""><b>CPF:</b></label>
                                   <input type="text" className="form-input" name="cpf" value={cpf} onChange={cpfChange} required />
                               </div>
   
   
                               <div className="form-group">
                                   <label htmlFor=""><b>Conta Bancária:</b></label>
                                   <input type="text" className="form-input" name="bank" onChange={onChange} required />
                               </div>
   
                               <div className="form-group">
                                   <label htmlFor=""><b>Funcionários:</b></label>
                                   <input type="text" className="form-input" name="employees" onChange={onChange} required />
                               </div>*/}
   
                               <div className="btn-group">
                                   <Link className="button" to="/faccoes">Cancelar</Link>
                                   <button className="button" type="submit">Cadastrar</button>
                               </div> 

                               
   
                           </form>
                        )}

                    </div>

                </div>

            </div>
        </>
    );
}
