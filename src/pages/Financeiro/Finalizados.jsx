import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStopCircle } from "react-icons/fi";
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

    const List = () => {
        if (data.length) {
            return (
                <ul className="list-ul">
                    {data.length && data.map(item => {
                        return (
                            <li key={item.id} className="list-li">
                                <Link to={`/financeiro/finalizados-lista/${item.nfe_number}`} className="list-link">
                                    <strong>NF-e:</strong> {item.nfe_number}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return <div className="alert">Nehuma NF-e Liberada</div>
    }
    console.log(data)
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
                            <FiStopCircle className="box-body-icon" />
                            <span> > Finalizados - Lista de NF-e</span>
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