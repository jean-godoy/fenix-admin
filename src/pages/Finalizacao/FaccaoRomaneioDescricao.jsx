import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiFileText } from "react-icons/fi";
import api from '../../api';


//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {
    const faccao_code = props.match.params.faccao_code ?? null;
    const op = props.match.params.op ?? null;
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(null);
    const history = useHistory();
    
    useEffect(() => {
        api.get(`/api/finalizacao/get-romaneio/${faccao_code}/${op}`).then(({ data }) => {
            setData(data);
            setStatus(parseInt(data.faccaoStatus));
            
        }).catch(e => {
            return alert('Ocorreu algum erro..');
        });
    }, []);

    function handleStatus(e){
        e.preventDefault();

        const data_values = {
            status : status,
            romaneio_code: data.romaneioCode
        }

        const data_string = JSON.stringify(data_values);
        
        api.post('/api/finalizacao/set-status', data_string ).then(({data}) => {
            alert(data);
        }).catch(e => {
            alert("Ocorreu algum erro..");
        });
    }
    
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
                            <span> > Ordem de Produção {data.ordemProducao} </span>
                        </header>

                        <form className="box-form" >

                            {/* <div className="form-group">

                                <label htmlFor=""><b>Status da O.P.</b></label>
                                <input type="text" className="form-input" name="os" />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="status-11"><b>Coletado</b></label>
                                <input className="input-checked" type="radio" onClick={({ target: { checked } }) => checked && setStatus(11)} id="status-11" checked={11 === status} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status-12"><b>Tag</b></label>
                                <input className="input-checked" type="radio" onClick={({ target: { checked } }) => checked && setStatus(12)} id="status-12" checked={12 === status} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status-13"><b>Revisão</b></label>
                                <input className="input-checked" type="radio" onClick={({ target: { checked } }) => checked && setStatus(13)} id="status-13" checked={13 === status} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status-14"><b>Flush</b></label>
                                <input className="input-checked" type="radio" onClick={({ target: { checked } }) => checked && setStatus(14)} id="status-14" checked={14 === status} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status-15"><b>Pronto para Embarque</b></label>
                                <input className="input-checked" type="radio" onClick={({ target: { checked } }) => checked && setStatus(9)} id="status-15" checked={15 === status} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status-5"><b>Tonalidade</b></label>
                                <input className="input-checked" type="radio" onClick={({ target: { checked } }) => checked && setStatus(16)} id="status-16" checked={16 === status} />
                            </div>



                            <div className="btn-group">
                                <Link className="button" to="/checking">Cancelar</Link>
                                <button className="button" type="submit" onClick={handleStatus} >Salvar</button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    );

}