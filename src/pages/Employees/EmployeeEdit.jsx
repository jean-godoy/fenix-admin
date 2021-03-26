import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import DateFullIn from '../../components/Date/DateFullIn';
import DateOut from '../../components/Date/DateOut';

//mask
import { mask, unMask } from 'remask';

export default props => {

    const id = props.match.params.id;
    const [data, setData] = useState([]);

     //maskers
     const [date, setDate] = useState('');
     const [cpf, setCpf] = useState('');
     const [rg, setRg] = useState('');
     const [phone, setPhone] = useState('');
     const [number, setNumber] = useState('');

     useEffect(() => {
        api.get(`/employees/get-id/${id}`).then(({data}) => {
            setData(data);

            const dateOut = DateOut(new Date(data.birthDate))
            setDate(mask(unMask(dateOut), ['99/99/9999'] ));
            setCpf(mask(unMask(data.cpf), ['999.999.999-99']));
            setRg(mask(unMask(data.rg), ['99.999.999-9']));
            setPhone(mask(unMask(data.phone), ['(99) 9999-9999', '(99) 9 9999-9999']));
            setNumber(mask(unMask(data.salary), ['9,99', '99,99', '999,99', '9.999,99', '99.999,99']));
        }).catch(e => {
            return alert('Nenhum funcionário corresponde está id');
        });
    },[]);

    function onChange(e) {
        const { name, value } = e.target;
        setData({...data, [name]:value});
    };

    function onSubmit(e) {
        e.preventDefault();

        //muda data para padrao americano
        let getDate = date;
        let outDate = getDate.split('/').reverse().join('-');
        const DateIn = DateFullIn(new Date());

       const data_values = {
            id_employee: id,
            employee_name: data.employee_name,
            phone: unMask(phone),
            street: data.street,
            cpf: unMask(cpf),
            rg: unMask(rg),
            birth_date: outDate,
            city: data.city,
            uf: data.uf,
            email: data.email,
            office: data.office,
            salary: unMask(number),
            create_at: DateIn,
            update_at: DateIn,
        }

        const data_string = JSON.stringify(data_values);
        console.log(data_string)

        // api.post('/employee-add', data_string).then((res) =>{
        //     alert('Funcionário Cadastrado Com Sucesso!!');
        // }).catch(e => {
        //     console.log(e);
        //     return alert('Erro ao Cadastrar Funcionário.. :(')
        // });
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
    console.log(date)
    return(
        <>
            <Menu />
            <div className="container">

            <Header />
                
                <div className="box-main">

                    <header>Editar Funcionário</header>

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
                            <span> > Dados do Funcionário: </span>
                        </header>

                        <form onSubmit={onSubmit} className="box-form">

                            <div className="form-group">
                                <label htmlFor=""><b>Nome Completo:</b></label>
                                <input type="text" className="form-input" name="employeeName" value={data.employeeName} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Telefone:</b></label>
                                <input type="text" className="form-input" name="phone" value={phone} onChange={phoneChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Endereço:</b></label>
                                <input type="text" className="form-input" name="street" value={data.street} onChange={onChange} required />
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
                                <input type="text" className="form-input" name="city" value={data.city} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Estado:</b></label>
                                <input type="text" className="form-input" name="uf" value={data.uf} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>E-mail:</b></label>
                                <input type="text" className="form-input" name="email" value={data.email} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Função:</b></label>
                                <input type="text" className="form-input" name="office" value={data.office} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Salário:</b></label>
                                <input type="text" className="form-input" name="salary" value={number} onChange={numberChange} required />
                            </div>

                            <div className="btn-group">
                                <Link className="button" to="/user">Cancelar</Link>
                                <button className="button" type="submit">Editar</button>
                            </div>

                        </form>
                    </div>

                </div>
                {/* box main */}

            </div>
        </>
    );
}