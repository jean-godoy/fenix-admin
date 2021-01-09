import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const [data, setData] = useState([]);
    const [nfe, setNfe] = useState([]);
    const history = useHistory();

    const handNfe  = (e) => setNfe(e.target.files[0]);

    function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append('nfe_file', nfe);
       
        api.post('/checking/create', formData).then((res) => {
            alert('Carga Adiciona Com Sucesso!!');
            return history.push('/cheking/')
        }).catch(e => {
            console.log({e})
            return alert('Erro ao Adicionar Carga.. :(')
        });
    };

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Adicionar Carga</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/cheking">Cargas</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/check-add">Adicionar Carga</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUserPlus className="box-body-icon" />
                            <span> > Cadastro de Carga</span>
                        </header>

                        <form onSubmit={onSubmit} className="box-form">

                            <div className="form-group">
                                <label htmlFor=""><b>Arquivo NF-e:</b></label>
                                <input type="file" className="form-input" name="nfe_file" onChange={handNfe} required />
                            </div>

                            <div className="btn-group">
                                <Link className="button" to="/checking">Cancelar</Link>
                                <button className="button" type="submit">Cadastrar</button>
                            </div>

                        </form>
                    </div>

                </div>
                {/* box main */}

            </div>
        </>
    );
}