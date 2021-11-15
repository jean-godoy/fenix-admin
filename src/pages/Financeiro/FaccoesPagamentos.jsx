import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp } from "react-icons/fi";
import api from '../../api';
import './financeiro.css';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

//services
import { teste, Financeiro } from './../../services/financeiro_service';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/financeiro/get-payroll-by-nfe').then(({ data }) => {
            setData(data);
        })
    }, []);

    function List() {

        if (data.length) {
            return (
                <ul className="list-ul">
                    {data.map(item => {
                        return (
                            <li className="list-li">
                                <Link to={`/financeiro/pagamentos-referente-nfe/${item.nfe}`} className="list-link">{item.nfe}</Link>
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return <div className="message">Nehum pagamento registrado no momento.</div>
        }
    }


    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Financeiro </header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/financeiro">Financeiro</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiTrendingUp className="box-body-icon" />
                            <span> > Facções Pagamentos</span>
                        </header>

                        <div className="box-list">
                            <List />
                        </div>
                    </div>

                </div>

            </div>
        </>
    );

}