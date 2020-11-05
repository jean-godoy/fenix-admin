import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import DateFullIn from '../../components/Date/DateFullIn';

//mask
import { mask, unMask } from 'remask';

const initialValues = {
    faccao_name: '',
    phone: '',
    street: '',
    cpf: '',
    bank: '',
    employees: '',
}

export default props => {

    const [data, setData] = useState(initialValues);

    //maskers
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');

    function onChange(e) {
        const { name, value } = e.target;
        setData({...data, [name]:value});
    };

    function onSubmit(e) {
        e.preventDefault();

       const data_values = {
            faccao_name: data.faccao_name,
            phone: unMask(phone),
            street: data.street,
            cpf: unMask(cpf),
            bank: data.bank,
            employees: data.employees
        }

        const data_string = JSON.stringify(data_values);

        console.log(data_string);

        api.post('/faccao-add', data_string).then((res) =>{
            alert('Funcionário Cadastrado Com Sucesso!!');
        }).catch(e => {
            return alert('Erro ao Cadastrar Funcionário.. :(');
        });
    };

    const cpfChange = e => {
        setCpf(mask(unMask(e.target.value), ['999.999.999-99']));
    };

    const phoneChange = e => {
        setPhone(mask(unMask(e.target.value), ['(99) 9999-9999', '(99) 9 9999-9999']));
    }

   

    return(
        <>
            <Menu />
            <div className="container">

            <Header />
                
                <div className="box-main">

                    <header>Adicionar Facção</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/faccoes">Facções</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/faccao-add">Adicionar Facção</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUserPlus className="box-body-icon" />
                            <span> > Cadastro de Nova Facção</span>
                        </header>

                        <form onSubmit={onSubmit} className="box-form">

                            <div className="form-group">
                                <label htmlFor=""><b>Nome:</b></label>
                                <input type="text" className="form-input" name="faccao_name" onChange={onChange} required />
                            </div>

                            <div className="form-group">
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
                            </div>

                            <div className="btn-group">
                                <Link className="button" to="/faccoes">Cancelar</Link>
                                <button className="button" type="submit">Cadastrar</button>
                            </div>

                        </form>
                    </div>

                </div>
                {/* box main */}

            </div>
        </>
    );
}