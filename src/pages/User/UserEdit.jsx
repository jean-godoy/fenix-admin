import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const id_user = props.match.params.id;
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
        api.get(`/users/get-id/${id_user}`).then(({ data }) => {
            setUser(data);
        })
    },[]);

    function onChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    function onSubmit(e) {
        e.preventDefault();

        const data_values = {
            user_name:  user.userName,
            user_email: user.userEmail,
            user_pass:  user.userPass,
            token: '12345'
        }
        console.log(data_values)
        const data_string = JSON.stringify(data_values);

        api.put(`/users/update/${id_user}`, data_string).then((res) => {
            console.log(res);
            alert("Usuario: "+user.user_name+", editado com sucesso!");
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
                                <input name="userName" type="text" className="form-input" value={user.userName} onChange={onChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>E-mail:</b></label>
                                <input name="userEmail" type="text" className="form-input" value={user.userEmail} onChange={onChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Senha:</b></label>
                                <input name="userPass" type="text" className="form-input" value={user.userPass} onChange={onChange} />
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