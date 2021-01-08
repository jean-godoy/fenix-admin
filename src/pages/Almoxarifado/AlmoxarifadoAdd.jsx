import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import api from '../../api';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

const initialValues = {
    produto: '',
    marca: '',
    modelo: '',
    num_serie: '',
    quantidade: ''

}

export default props => {

    const [values, setValues] = useState(initialValues);
    const history = useHistory();

    function onChange(e) {
        const { name, value } = e.target;
        setValues({...values, [name]:value});
    }

    function onSubmit(e) {
        e.preventDefault();

        const data_string = JSON.stringify(values);
        

         api.post('/almoxarifados/create', data_string).then((res) => {
             alert('Produto Cadastrado com Sucesso!!');
             return history.push('/almoxarifado')
         }).catch(e => {
             alert('Erro ao Cadastrar Produto.. :(')
               console.log(e); 
         });

    }

   
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Almoxarifado</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/almoxarifado">Produtos</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/almoxarifado-add">Adicionar Produto</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Adicionar Produto</span>
                        </header>

                        <form onSubmit={onSubmit} className="box-form">

                            <div className="form-group">
                                <label htmlFor=""><b>Produto:</b></label>
                                <input type="text" className="form-input" name="produto" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Marca:</b></label>
                                <input type="text" className="form-input" name="marca" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Modelo:</b></label>
                                <input type="text" className="form-input" name="modelo" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Número de Série:</b></label>
                                <input type="text" className="form-input" name="num_serie" onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Quantidade:</b></label>
                                <input type="text" className="form-input" name="quantidade" onChange={onChange} required />
                            </div>

                            <div className="btn-group">
                                <Link className="button" to="/almoxarifado">Cancelar</Link>
                                <button className="button" type="submit">Cadastrar</button>
                            </div>

                        </form>


                    </div>


                </div>

            </div>
        </>
    );
}