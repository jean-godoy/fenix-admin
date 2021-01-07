import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus, FiUsers } from "react-icons/fi";
import api from '../../api';
import './estoque.css';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import DateFullIn from '../../components/Date/DateFullIn';

const initialValues = {
    op: ''
}

export default props => {

    const [data, setData] = useState(initialValues);
    const [response, setResponse] = useState([]);
    const [sequencia, setSequencia] = useState([]);

    // useEffect(() => {
    //     api.get('/romaneios').then(({ data }) => {
    //         setData(data);
    //     }).catch(e => {
    //         return alert('Nenhum Romaneio Válido');
    //     });
    // }, []);

    function onChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    function onSubmit(e) {
        e.preventDefault();

        api.get(`/estoque/get-id/${data.op}`).then(({ data }) => {
            setResponse(data);
            setSequencia(data.sequencia_operacional);
        }).catch(e => {
            return alert('Nenhum romaneio corresponde a essa o.p.');
        });
    }
    console.log(sequencia);
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Estoque</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/estoque">Pesquisa</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <div className="header-src">

                                <div>
                                    <FiUsers className="box-body-icon" />
                                    <span> > Selecione uma Ordem de Produção</span>
                                </div>

                                <div className="src">
                                    <form onSubmit={onSubmit} className="box-src">
                                        <input type="text" className="src-input" name="op" onChange={onChange} required />
                                        <button className="src-button" type="submit">Buscar</button>
                                    </form>
                                </div>

                            </div>
                        </header>

                        <div className="box-romaneio">

                            <header className="romaneio-header">

                                <div className="column-left">
                                    <div>Pacifico Sul Ind. Têxtil e Confec. Ltda           17/09/20 16:45</div>
                                    <div className="descricao">REF: 45204 - COR 000001 - DESC: BLUSAO ML</div>

                                    <div className="grade">

                                    </div>
                                </div>

                                <div className="column-right">


                                </div>

                            </header>

                            <main className="box-list">

                                <ul className="romaneio-list-ul">

                                    {sequencia.length && sequencia.map(item => {

                                        return (
                                            <li className="box-nav-li" key={item.id}>
                                                <Link className="box-nav-link">

                                                    <div className="romaneio-list">
                                                        <div className="maquina romaneio-config"> {item.maquina} </div>
                                                        <div className="seq romaneio-config"> {item.sequencia} </div>
                                                        <div className="operacao romaneio-config"> {item.operacao} </div>
                                                        <div className="tempo romaneio-config"> {item.tempoSemInt} </div>
                                                        <div className="tempo romaneio-config"> {item.tempoComInt} </div>
                                                        <div className="hora romaneio-config"> {item.pecasHora} </div>
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