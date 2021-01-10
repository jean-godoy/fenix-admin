import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFile } from "react-icons/fi";
import api from '../../api';
import './estoque.css';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

const initialValues = {
    op: ''
}

export default props => {

    const [data, setData] = useState(initialValues);
    // const [response, setResponse] = useState([]);
    const [sequencia, setSequencia] = useState([]);

    useEffect(() => {
        api.get('/estoque/show').then(({ data }) => {
            setData(data);
        }).catch(e => {
            return alert('Nenhum Romaneio Cadastrado!');
        });
    }, []);

    function onChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    function onSubmit(e) {
        e.preventDefault();

        api.get('/estoque/show').then(({ data }) => {
            // setResponse(data);
            setSequencia(data.sequencia_operacional);
        }).catch(e => {
            return alert('Nenhum romaneio corresponde a essa o.p.');
        });
    }
    console.log(data);
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Estoque</header>

                    {/* <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/estoque">Pesquisa</Link>
                            </li>

                        </ul>
                    </nav> */}

                    <div className="box-body">

                        <header>
                            <div className="header-src">

                                <div>
                                    <FiFile className="box-body-icon" />
                                    <span> > Selecione uma O.P.</span>
                                </div>

                                <div className="src">
                                    <form onSubmit={onSubmit} className="box-src">
                                        <input type="text" className="src-input" name="op" onChange={onChange} required />
                                        <button className="src-button" type="submit">Buscar</button>
                                    </form>
                                </div>

                            </div>
                        </header>

                        <div className="box-estoque">

                            <main className="box-estoque-list">

                                <ul className="romaneio-list-ul">

                                    {data.length && data.map(item => {

                                        return (
                                            <li className="box-nav-li" key={item.id}>
                                                <Link className="box-nav-link" to={`/estoque/get/${item.ordemProducao}`} >

                                                    <div className="box-estoque-op">

                                                        <span className="ref"> <b>REF: </b> {item.referencia} </span>
                                                        <span className="ref"> <b>Des. Servicço: </b> {item.descricaoServico} </span>
                                                        <span className="ref"> <b>O.P: </b> {item.ordemProducao} </span>
                                                        <span className="ref"> <b>Qnt. Total: </b> {item.quantidade} </span>
                                                        <span className="ref"> <b>Semana: </b> {item.semana} </span>

                                                    </div>
                                            
                                                </Link>
                                            </li>
                                        );
                                    })}

                                </ul>

                            </main>

                        </div>



                    </div>

                </div>

            </div>
        </>
    );

}