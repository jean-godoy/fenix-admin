import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import api from '../../api';


//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

import { mask, unMask } from 'remask';

export default props => {

    const id = props.match.params.id;
    const [data, setData] = useState([]);
    const [faccaoCode, setFaccaoCode] = useState(null);

    //maskers
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('');

    //faz o get da fação na API pelo id.
    useEffect(() => {
        api.get(`/faccoes/get-id/${id}`).then(({ data }) => {
            setData(data);
            setFaccaoCode(data.faccaoCode);
            setCpf(mask(unMask(data.cpf), ['999.999.999-99']));
            setPhone(mask(unMask(data.phone), ['(99) 9999-9999', '(99) 9 9999-9999']));
        }).catch(e => {
            return alert('Nenhuma Faccção corresponde está id');
        });
    },[]);

    const onSubmit = () => {

    }

    //função responsavel dela edição do valor.
    const onChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    //funçao responsavel por editar o0 telefone.
    const phoneChange = e => {
        setPhone(e.target.value);
    }

    //função responsavel por editar o CPF.
    const cpfChange = e => {
        setCpf(e.target.value);
    }
   
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Facção Editar</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/faccoes">Facções</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to={`/faccoes/dados-bancarios/${faccaoCode}`}>Dados Bancarios</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to={`/faccoes/forma-pagamento/${faccaoCode}`}>Forma de Pagamento</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">

                        <header>
                            <FiEdit className="box-body-icon" />
                            <span> > Editar Facção: {data.faccaoName}</span>
                        </header>

                        <form onSubmit={onSubmit} className="box-form">

                            <div className="form-group">
                                <input type="text" placeholder="Facção" className="form-input-line" name="faccaoName" value={data.faccaoName} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Telefone" className="form-input-line" name="phone" value={phone} onChange={phoneChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="CPF" className="form-input-line" name="cpf" value={cpf} onChange={cpfChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Cidade" className="form-input-line" name="city" value={data.cidade} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Bairro" className="form-input-line" name="bairro" value={data.bairro} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Rua" className="form-input-line" name="street" value={data.street} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Número" className="form-input-line" name="numero" value={data.numero} onChange={onChange} required />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Quantidade de funcionários" className="form-input-line" name="employees" value={data.employees} onChange={onChange} required />
                            </div>

                            <div className="btn-group">
                                <Link className="button" to="/faccoes">Cancelar</Link>
                                <button className="button" type="submit">Cadastrar</button>
                            </div>

                        </form>

                        <div className="btn-group">
                            <Link className="button" to={`/faccao-edit/${id}`}>Editar</Link>
                            <Link className="button" to="/faccoes">OK</Link>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
