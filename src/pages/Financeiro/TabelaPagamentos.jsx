import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar } from "react-icons/fi";
import api from '../../api';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/romaneios/list').then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhum Romaneio Encontrado!');
        });
    }, []);
    // console.log(data)
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Financeiro</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/financeiro">Financeiro</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/tabela-pagamentos">Tabela de Pagamentos</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiCalendar className="box-body-icon" />
                            <span> > Tabela de Pagamentos</span>
                        </header>

                        <table id="tabela" className="tabela" bgcolor="#006da4" cellpadding="0" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Data de Entrega</th>
                                    <th>Data de Pagamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>


                    </div>

                </div>

            </div>
        </>
    );

}