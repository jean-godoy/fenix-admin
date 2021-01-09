import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from "react-icons/fi";
import api from '../../api';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/romaneios/').then(({data}) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhum Romaneio Encontrado!');
        });
    },[]);
    
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
                            <FiUsers className="box-body-icon" />
                            <span> > Selecione um Romaneio</span>
                        </header>

                        <div className="box-list">
                            <ul className="box-list-ul">
                                {/* {data.length && data.map(item => {
                                    // obs: os seria op, foi mudado durante o preceso
                                    return (
                                        <li key={item.id} className={`box-list-li status-${item.status}`}>
                                            <Link className="box-list-link" to={`/romaneio-expedicao/${item.os}`} >
                                                <span className="box-list-span"><b>Romaneio O.P: </b>{item.os} </span>
                                            </Link>
                                        </li>
                                    )
                                })} */}
                            </ul>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );

}