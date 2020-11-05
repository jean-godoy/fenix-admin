import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import DateFullIn from '../../components/Date/DateFullIn';

export default props => {

    const id_user = props.match.params.id;
    const dateFullIn = DateFullIn(new Date());
    const [user, setUser] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get(`/user-id/${id_user}`).then(({ data }) => {
            setUser(data);
        })
    }, []);

    function onChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    function onSubmit(e) {
        e.preventDefault();

        const data_values = {
            id_user: user.id_user,
            user_name: user.user_name,
            user_email: user.user_email,
            user_pass: user.user_pass,
            token: '12345'
        }
        
        const data_string = JSON.stringify(data_values);

        api.post('/user-edit', data_string).then((res) => {
            console.log(res);
            alert("Usuario "+user.user_name+", editado com sucesso!");
            return history.push('/user');
        }).catch((e) => {
            alert("Ops.., Erro ao editar usuario..");
            console.log(e);
        });

    }
    
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Editar Usuario</header>

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
                            <span> > Dados do Usuario: {user.user_name} </span>
                        </header>

                        <form onSubmit={onSubmit} className="box-form">

                            <div className="form-group">
                                <label htmlFor=""><b>Nome Completo:</b></label>
                                <input name="user_name" type="text" className="form-input" value={user.user_name} onChange={onChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>E-mail:</b></label>
                                <input name="user_email" type="text" className="form-input" value={user.user_email} onChange={onChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Senha:</b></label>
                                <input name="user_pass" type="text" className="form-input" value={user.user_pass} onChange={onChange} />
                            </div>

                            <div className="btn-group">
                                <Link className="button" to="/user">Excluir</Link>
                                <Link className="button" to="/user">Cancelar</Link>
                                <button className="button" type="submit">Editar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}