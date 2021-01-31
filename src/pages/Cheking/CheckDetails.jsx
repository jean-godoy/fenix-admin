import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const id = props.match.params.id;
    
    const [values, setValues] = useState({});
    const history = useHistory();

    useEffect(() => {
        api.get(`/checking/get-id/${id}`).then(({ data }) => {
            setValues(data);
        })
    }, []);

    function onChange({target:{value,name}}) {
        setValues({ ...values, [name]: value });
    }

    function onSubmit(e) {
        e.preventDefault();

        const data_values = {
            status: values.status
        }

        const data_string = JSON.stringify(data_values);
        
        api.put(`/checking/status/${id}`, data_string).then((res) => {
            alert("Status editado com sucesso!");
            return history.push('/cheking');
        }).catch((e) => {
            alert("Ops.., Erro ao Atualizar Status..");
            console.log(e);
        });

    }
    console.log(values)
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Checagem de Carga</header>

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
                            <FiUserPlus className="" />
                            <span> > Liberação de Carga - O.P: {values.os} </span>
                        </header>

                        <form onSubmit={onSubmit} className="box-form">

                            <div className="form-group">

                                <label htmlFor=""><b>Status da O.P.</b></label>
                                <input type="text" className="form-input" name="os" value={values.os} onChange={onChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status-1"><b>Aguardando Verificação</b></label>
                                <input className="input-checked" type="radio" onChange={({ target:{checked} }) => onChange({target:{name:'status', value:1}})} id="status-1"  checked={1 === values.status} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status-2"><b>OK</b></label>
                                <input className="input-checked" type="radio" onChange={({ target:{checked} }) => onChange({target:{name:'status', value:5}})} id="status-5"  checked={5 === values.status} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status-3"><b>Falta de Linhas</b></label>
                                <input className="input-checked" type="radio" onChange={({ target:{checked} }) => onChange({target:{name:'status', value:2}})} id="status-2"  checked={2 === values.status} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status-4"><b>Falta Aviamento</b></label>
                                <input className="input-checked" type="radio" onChange={({ target:{checked} }) => onChange({target:{name:'status', value:3}})} id="status-3"  checked={3 === values.status} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status-5"><b>Tonalidade</b></label>
                                <input className="input-checked" type="radio" onChange={({ target:{checked} }) => onChange({target:{name:'status', value:4}})} id="status-4"  checked={4 === values.status} />
                            </div>



                            <div className="btn-group">
                                <Link className="button" to="/checking">Cancelar</Link>
                                <button className="button" type="submit">Cadastrar</button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );
}