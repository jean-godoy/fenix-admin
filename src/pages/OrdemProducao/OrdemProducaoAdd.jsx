import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiCheckCircle } from "react-icons/fi";
import api from '../../api';


//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

const initialValues = {
    num_nfe: '',
    num_op: ''
}

export default props => {

    const num_nfe = props.match.params.id;
    const [data, setData] = useState(initialValues);

    const [op, setOp] = useState(null);
    const history = useHistory();

    function onChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handOp = (e) => setOp(e.target.files[0]);


    function sendData(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.append('num_nfe', num_nfe);
        formData.append('num_op', data.num_op);
        formData.append('op_file', op);

        api.post('/op/upload-op', formData).then(({ data }) => {
            alert('OK');
            return history.push('/ordem-producao/');
        }).catch(e => {
            console.log({ e });
            return alert('Ops, ocorreu algum erro..' + e)
        });

    }

    async function checkOp(e) {
        const op = e.target.value;
        if (op.length == 5) {
            const { data } = await api.get(`/romaneios/check-op/${op}`);
            if(data == false){
                alert('Romaneio valido')
            } else {
                alert('Número de Romaneio já cadastrado!');
            }
        }
    }

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Ordem Produção</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/ordem-producao">Ordem Produção</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiCheckCircle className="box-body-icon" />
                            <span> > Nova Ordem Produção Referente a NF-e : {num_nfe} </span>
                        </header>

                        <form onSubmit={sendData} className="box-form">

                            <div className="form-group">
                                <label htmlFor=""><b>O.P:</b></label>
                                <input type="text" className="form-input" name="num_op" onChange={onChange} onChange={checkOp} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Romaneio:</b></label>
                                <input type="file" className="form-input" name="op_file" onChange={handOp} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Ficha técnica</b></label>
                                <input type="file" className="form-input" name="image_file" onChange={handOp} required />
                            </div>

                            <div className="btn-group">
                                <Link className="button" to="/ordem-producao">Cancelar</Link>
                                <button className="button" type="submit">Gerar Ordem</button>
                            </div>

                        </form>
                    </div>

                </div>
                {/* box main */}

            </div>
        </>
    );
}