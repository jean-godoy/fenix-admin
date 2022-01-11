import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText } from "react-icons/fi";
import api from '../../api';
import './config.css';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/api/status').then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhuma NF-e Liberada!');
        });
    }, []);

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Regras de Negócio</header>
                    {/* <div className="horizontal-line"></div> */}
                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/configurações">Configurações</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="">

                        <header>
                            {/* <FiFileText className="box-body-icon" />
                            <span> > Menu</span> */}
                        </header>

                        <div className="box-config">
                            <div className="box-text">
                                As regras de negócio servem para dar permissão de acesso ao usuário cadastrado.
                                <div className="box-roles">
                                    <p><b>1 -</b> Administrador - Total acesso ao sistema.</p>
                                    <p><b>2 -</b> Revisão - Permite acesso a área de Revisão.</p>
                                    <p><b>3 -</b> Facções - Permite acesso ao aplicativo de facções mediante login e senha.</p>
                                    <p><b>4 -</b> Trasporte - Permite acesso ao aplicativo de transporte mediante login e senha.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );

}