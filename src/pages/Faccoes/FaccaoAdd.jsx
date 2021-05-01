import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

//mask
import { mask, unMask } from 'remask';

const initialValues = {
    user_name: '',
    user_email: '',
    user_pass: '',
    pass_confirm: '',
    faccao_name: '',
    phone: '',
    cidade: '',
    bairro: '',
    street: '',
    numero: '',
    cpf: '',
    bank: '',
    employees: '',
}

export default props => {

    const [data, setData] = useState(initialValues);
    const history = useHistory();

    //maskers
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');

    function onChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    function onSubmit(e) {
        e.preventDefault();

        if(data.user_pass !== data.pass_confirm)
        {
            alert("SENHAS NÃO CONFEREM...");  
        } 

        const data_values = {
            user_name: data.user_name,
            user_email: data.user_email,
            user_pass: data.user_pass,
            faccao_name: data.faccao_name,
            phone: unMask(phone),
            cidade: data.cidade,
            bairro: data.bairro,
            street: data.street,
            numero: data.numero,
            cpf: unMask(cpf),
            bank: data.bank,
            employees: data.employees
        }

        const data_string = JSON.stringify(data_values);
    //    console.log(data_string)
        api.post('/faccoes/create', data_string).then((res) => {
            alert('Funcionário Cadastrado Com Sucesso!!');
            return history.push('/faccoes');
        }).catch(e => {
            console.log(e)
            return alert('Erro ao Cadastrar Funcionário.. :(');
        });
    };

    const cpfChange = e => {
        setCpf(mask(unMask(e.target.value), ['999.999.999-99', '99.999.999/9999-99']));
    };

    const phoneChange = e => {
        setPhone(mask(unMask(e.target.value), ['(99) 9999-9999', '(99) 9 9999-9999']));
    }

    return (
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
                                <input type="text" placeholder="Nome de Usuário" className="form-input-line" name="user_name" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="E-mail" className="form-input-line" name="user_email" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="password" placeholder="Senha" className="form-input-line" name="user_pass" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="password" placeholder="Confirmar senha" className="form-input-line" name="pass_confirm" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Telefone" className="form-input-line" name="phone" value={phone} onChange={phoneChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Cidade" className="form-input-line" name="cidade" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Bairro" className="form-input-line" name="bairro" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Rua" className="form-input-line" name="street" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Número" className="form-input-line" name="numero" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="CPF" className="form-input-line" name="cpf" value={cpf} onChange={cpfChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Nome facção" className="form-input-line" name="faccao_name" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Quantidade de funcionários" className="form-input-line" name="employees" onChange={onChange} required />
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