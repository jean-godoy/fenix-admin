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
    name: '',
    phone: '',
    address: '',
    cpf: '',
    rg: '',
    birth_date: '',
    city: '',
    state: '',
    email: '',
    office: '',
    salary: '',
}

export default props => {

    const [data, setData] = useState(initialValues);
    const history = useHistory();

    //maskers
    const [date, setDate] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [phone, setPhone] = useState('');
    const [number, setNumber] = useState('');

    function onChange(e) {
        const { name, value } = e.target;
        setData({...data, [name]:value});
    };

    function onSubmit(e) {
        e.preventDefault();

        //muda data para padrao americano
        let getDate = date;
        let outDate = getDate.split('/').reverse().join('-');

       const data_values = {
            employee_name: data.name,
            phone: unMask(phone),
            street: data.address,
            cpf: unMask(cpf),
            rg: unMask(rg),
            birth_date: outDate,
            city: data.city,
            uf: data.state,
            email: data.email,
            office: data.office,
            salary: unMask(number),
        }

        const data_string = JSON.stringify(data_values);

        api.post('/employees/create', data_string).then((res) =>{
            alert('Funcionário Cadastrado Com Sucesso!!');
            return history.push('/employees');
        }).catch(e => {
            return alert('Erro ao Cadastrar Funcionário.. :(')
        });
    };

    const dateChange = e => {
        setDate(mask(unMask(e.target.value), ['99/99/9999'] ));
    };

    const rgChange = e => {
        setRg(mask(unMask(e.target.value), ['99.999.999-9']));
    };

    const cpfChange = e => {
        setCpf(mask(unMask(e.target.value), ['999.999.999-99']));
    };

    const phoneChange = e => {
        setPhone(mask(unMask(e.target.value), ['(99) 9999-9999', '(99) 9 9999-9999']));
    }

    const numberChange = e => {
        setNumber(mask(unMask(e.target.value), ['9,99', '99,99', '999,99', '9.999,99', '99.999,99']));
    }

    return(
        <>
            <Menu />
            <div className="container">

            <Header />
                
                <div className="box-main">

                    <header>Adicionar Funcionário</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/employees">Funcionários</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/employee-add">Adicionar Funcionário</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUserPlus className="box-body-icon" />
                            <span> > Cadastro de Novo Funcionário</span>
                        </header>

                        <form onSubmit={onSubmit} className="box-form">

                            <div className="form-group">
                                <label htmlFor=""><b>Nome Completo:</b></label>
                                <input type="text" className="form-input" name="name" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Telefone:</b></label>
                                <input type="text" className="form-input" name="phone" value={phone} onChange={phoneChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Endereço:</b></label>
                                <input type="text" className="form-input" name="address" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>CPF:</b></label>
                                <input type="text" className="form-input" name="cpf" value={cpf} onChange={cpfChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>RG:</b></label>
                                <input type="text" className="form-input" name="rg" value={rg} onChange={rgChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Data Nasc:</b></label>
                                <input type="text" className="form-input" name="birth_date" onChange={dateChange} value={date} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Cidade:</b></label>
                                <input type="text" className="form-input" name="city" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Estado:</b></label>
                                <input type="text" className="form-input" name="state" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>E-mail:</b></label>
                                <input type="text" className="form-input" name="email" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Função:</b></label>
                                <input type="text" className="form-input" name="office" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Salário:</b></label>
                                <input type="text" className="form-input" name="salary" value={number} onChange={numberChange} required />
                            </div>

                            <div className="btn-group">
                                <Link className="button" to="/user">Cancelar</Link>
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