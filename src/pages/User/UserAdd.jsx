import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';
import './user.css';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import DateFullIn from '../../components/Date/DateFullIn';

const initialValues = {
    user_name: '',
    user_email: '',
    user_pass: '',
    user_pass_check: ''
}

export default props => {

    const [data, setData] = useState(initialValues);
    const dateFullIn = DateFullIn(new Date());

    function onChange(e) {
        const { name, value } = e.target;
        setData({...data, [name]:value});
    }

    function onSubmit(e) {
        e.preventDefault();

        const data_values = {
            user_name: data.user_name,
            user_email: data.user_email,
            user_pass: data.user_pass,
            token: '12345'
        };
        const data_string = JSON.stringify(data_values);
       
        api.post('/user-add', data_string).then((res) => {
            console.log(res);
            alert('Usuario cadastrado com sucesso!');
        }).catch(e => {
            alert('Erro ao cadastrar usuario, - '+e);
        });

    }

    // console.log(data);
    return(
        <>
            <Menu />
            <div className="container">

                <Header />
                
                <div className="box-main">

                    <header>Adicionar Usuario</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/user">Usuarios</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/user-add">Adicionar Usuario</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUserPlus className="box-body-icon" />
                            <span> > Cadastro de Novo Usuário</span>
                        </header>

                        <form onSubmit={onSubmit} className="box-form">

                            <div className="form-group">
                                <label htmlFor=""><b>Nome Completo:</b></label>
                                <input type="text" className="form-input" name="user_name" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>E-mail:</b></label>
                                <input type="text" className="form-input" name="user_email" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Senha:</b></label>
                                <input type="text" className="form-input" name="user_pass" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Confirmar Senha:</b></label>
                                <input type="text" className="form-input" name="user_pass_check" onChange={onChange} required />
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