import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFolder } from "react-icons/fi";
import api from '../../api';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const id = props.match.params.id;
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get(`/almoxarifados/get-id/${id}`).then(({ data }) => {
            setData(data);
        })
    }, []);
    console.log(data)
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Produto Detalhes</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/almoxarifado">Produtos</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/almoxarifado-add">Adicionar Produtos</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiFolder className="box-body-icon" />
                            <span> > Dados do Produto: {data.produto} </span>
                        </header>

                        <div className="box-data">

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Produto: </b>{data.produto}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Marca: </b>{data.marca}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Modelo: </b>{data.modelo}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Número de Série: </b>{data.numSerie}
                                </span>
                            </div>

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <b>Quantidade: </b>{data.quantidade}
                                </span>
                            </div>

                        </div>

                        <div className="btn-group">
                            {/* <Link className="button" to={`/almoxarifado-edit/${id}`}>Editar</Link> */}
                            <Link className="button" to="/user">OK</Link>
                        </div>

                    </div>

                </div>
                {/* closed box-main */}

            </div>
        </>
    );
}