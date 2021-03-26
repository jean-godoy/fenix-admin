import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText } from "react-icons/fi";
import api from '../../api';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/api/finalizacao/get-all').then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhuma NF-e Liberada!');
        });
    }, []);

    function HandleList() {
        if (data > 0) {
            return (
                <ul className="box-list-ul">
                    {data.map(item => {
                        return (
                            <li key={item.id} className={`box-list-li status-${item.status}`}>
                                <Link className="box-list-link" to={`/finalização/facção-romaneio/${item.faccao_code}/${item.ordem_producao}`} >
                                    <span className="box-list-span"><b>O.P: </b>{item.ordem_producao} </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )
        } 
           
        return <div className="alert">Nenhuma dado cadastrado!</div>
    
    }

    // console.log(data)
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Finalização</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/ordem-producao">Lista O.P.</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiFileText className="box-body-icon" />
                            <span> > Selecione uma Ordem de Produção</span>
                        </header>

                        <div className="box-list">
                            <HandleList />
                        </div>

                    </div>

                </div>

            </div>
        </>
    );

}