import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFolderPlus, FiMoreHorizontal } from "react-icons/fi";
import api from '../../api';
import './romaneio.css';


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
                                <Link to={`/romaneio/${item.nfe_number}`} className="list-link">
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

    // console.log(data)
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Romaneios</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/romaneios">Romaneios</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/romaneio/expedicao">Expedição</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiFolderPlus className="box-body-icon" />
                            <span> > Lista de NF-e</span>
                        </header>

                        <div className="box-list">
                            <List />
                        </div>
                        {/* end box list  */}
                    </div>
                </div>
            </div>
        </>
    );

}