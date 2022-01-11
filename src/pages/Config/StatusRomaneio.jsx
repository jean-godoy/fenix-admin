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

                    <header>Status do Romaneio</header>
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
                               Ordem da sequencia do status do romaneio.

                               <div className="box-status-romaneio">
                                   <p><b>1- </b>Aguardando verificação.</p>
                                   <p><b>2- </b>Falta de linhas.</p>
                                   <p><b>3- </b>Falta de aviamentos.</p>
                                   <p><b>4- </b>Tonalidade.</p>
                                   <p><b>5- </b>OK.</p>
                                   <p><b>6- </b>A produzir.</p>
                                   <p><b>7- </b>Iniciado.</p>
                                   <p><b>8- </b>Faltas.</p>
                                   <p><b>9- </b>Pronto para coleta.</p>
                                   <p><b>10- </b>Coletado.</p>
                                   <p><b>11- </b>Entregue.</p>
                               </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );

}