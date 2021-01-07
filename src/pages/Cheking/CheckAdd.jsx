import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import DateFullIn from '../../components/Date/DateFullIn';

//mask
import { mask, unMask } from 'remask';

const initialValues = {
    os: '',
    status: '',
}

export default props => {

    const [data, setData] = useState(initialValues);

    //maskers
    const [date, setDate] = useState('');


    function onChange(e) {
        const { name, value } = e.target;
        setData({...data, [name]:value});
    };

    function onSubmit(e) {
        e.preventDefault();

       const data_values = {
            os: data.os,
            status: 1,
           
        }

        const data_string = JSON.stringify(data_values);

        api.post('/checking/create', data_string).then((res) =>{
            alert('Carga Adiciona Com Sucesso!!');
        }).catch(e => {
            return alert('Erro ao Adicionar Carga.. :(')
        });
    };

    return(
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
                                <label htmlFor=""><b>Número O.P.</b></label>
                                <input type="text" className="form-input" name="os" onChange={onChange} required />
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