import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';
import './user.css';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

const initialValues = {
    user_name: '',
    user_email: '',
    user_pass: '',
    user_pass_check: ''
}

export default props => {

    const [data, setData] = useState(initialValues);
    const history = useHistory();
    const [roles, setRoles] = useState(null);

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
            token: '12345',
            roles: roles
        };
        const data_string = JSON.stringify(data_values);
       
        api.post('/users/create', data_string).then((res) => {
            alert('Usuario cadastrado com sucesso!');
            return history.push('/user');
        }).catch(e => {
            alert('Erro ao cadastrar usuario, - '+e);
        });

    }

    function handleRoles(e) {
        const { value } = e.target;
        setRoles(value);
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
                                <input type="text" placeholder="Nome Completo" className="form-input-line" name="user_name" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="E-mail" className="form-input-line" name="user_email" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="password" placeholder="Senha" className="form-input-line" name="user_pass" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="password" placeholder="Confirmar Senha" className="form-input-line" name="user_pass_check" onChange={onChange} required />
                            </div>

                            <div className="box-selected">
                                <div className="selected-group">
                                    <input type="radio" name="roles" id="1" value="1" onClick={handleRoles} />
                                    <label htmlFor="1">1 - administrador</label>
                                </div>
                                <div className="selected-group">
                                    <input type="radio" name="roles" id="2" value="2" onClick={handleRoles} />
                                    <label htmlFor="2">2 - Revisão</label>
                                </div>
                                <div className="selected-group">
                                    <input type="radio" name="roles" id="3" value="3" onClick={handleRoles} />
                                    <label htmlFor="3">3 - Facçoões</label>
                                </div>
                                <div className="selected-group">
                                    <input type="radio" name="roles" id="4" value="4" onClick={handleRoles}/>
                                    <label htmlFor="4">4 - Transporte</label>
                                </div>
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