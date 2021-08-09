import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp } from "react-icons/fi";
import api from '../../api';
import './financeiro.css'

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

//services
import { teste, Financeiro } from './../../services/financeiro_service';

export default props => {

    const [data, setData] = useState([]);

    const months = [
        { id: 1, month: "Janeiro" },
        { id: 2, month: "Fevereiro" },
        { id: 3, month: "Março" },
        { id: 4, month: "Abril" },
        { id: 5, month: "Maio" },
        { id: 6, month: "Junho" },
        { id: 7, month: "Julho" },
        { id: 8, month: "Agosto" },
        { id: 9, month: "Setembro" },
        { id: 10, month: "Outubro" },
        { id: 11, month: "Novembro" },
        { id: 12, month: "Dezembro" }
    ]

    useEffect(() => {
        api.get('/romaneios/list').then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhum Romaneio Encontrado!');
        });
    }, []);

    const ButtonList = () => {

        return (
            <ul>
                {months.map(item => (
                    <li className="month-li" key={item.id}>
                        <button className="month-button" value={item.id} onClick={handleButton} >{item.month}</button>
                    </li>
                ))}
            </ul>
        )
    }

    async function handleButton (e) {
        const res = await Financeiro();
        console.log(res.data)
    };

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

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/financeiro-finalizados">Finalizados</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiTrendingUp className="box-body-icon" />
                            <span> > Financeiro</span>
                        </header>

                        <div className="menu-financeiro">
                            <ul className="ul-menu-financeiro">
                                <li className="li-menu-financeiro"><Link to="/financeiro/contas-a-pagar" className="link-menu-financeiro">Contas a pagar</Link></li>
                                <li className="li-menu-financeiro"><Link to="/financeiro/contas-a-receber" className="link-menu-financeiro">Constas a receber</Link></li>
                                <li className="li-menu-financeiro"><Link className="link-menu-financeiro">Extratos</Link></li>
                                <li className="li-menu-financeiro"><Link className="link-menu-financeiro">Caixa</Link></li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );

}