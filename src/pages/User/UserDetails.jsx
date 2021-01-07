import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFolder } from "react-icons/fi";
import api from '../../api';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const id_user = props.match.params.id;
    const [user, setUser] = useState([]);

    useEffect(() => {
        api.get(`/users/get-id/${id_user}`).then(({ data }) => {
            setUser(data);
        })
    }, []);
    
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Usuario Detalhes</header>

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
                            <FiFolder className="box-body-icon" />
                            <span> > Dados do Usuario: {user.userName} </span>
                        </header>

                        <div className="box-data">

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Nome: </b>{user.userName}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>E-mail: </b>{user.userEmail}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Senha: </b>{user.userPass}
                                </span>
                            </div>

                        </div>

                        <div className="btn-group">
                            <Link className="button" to={`/user-edit/${id_user}`}>Editar</Link>
                            <Link className="button" to="/user">OK</Link>
                        </div>

                    </div>

                </div>
                {/* closed box-main */}

            </div>
        </>
    );
}