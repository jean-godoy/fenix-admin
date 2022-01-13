import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { FiUserPlus, FiUsers } from "react-icons/fi";
import api from '../../api';
import './provider.css';

//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

//mask
import { mask, unMask } from 'remask';

const initialValues = {
    name: '',
    cnpj: '',
    address: '',
    district: '',
    cep: '',
    city: '',
    phone: '',
    state: '',
    subscription: ''
}

export default props => {

    const [data, setData] = useState([]);
    const [uf, setUf] = useState('');

    //masker
    const [cnpj, setCnpj] = useState('');
    const [cep, setCep] = useState('');
    const [phone, setPhone] = useState('');
    const history = useHistory();

    function onSubmit(e) {
        e.preventDefault();

        const data_values = {
            provider_name: data.name,
            cnpj: unMask(cnpj),
            street: data.address,
            district: data.district,
            cep: unMask(cep),
            city: data.city,
            phone: unMask(phone),
            uf: uf,
            subscription: data.subscription
        }

        const data_string = JSON.stringify(data_values);
       
        //Manda os dados para API para inserção do registro.
        api.post('/providers/create', data_string).then((data) => {
            alert('Fornecedor Cadastrado Com Sucesso!');
            return history.push('/providers');
        }).catch(e => {
            return alert('Erro ao Cadastrar Fornecedor.. :(')
        });
    }

    function onChange(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }


    const cepChange = e => {
        setCep(mask(unMask(e.target.value), ['99.999.999']));
    }

    const cnpjChange = e => {
        setCnpj(mask(unMask(e.target.value), ['999.999.999-99', '99.999.999/9999-99']));
    }

    const phoneChange = e => {
        setPhone(mask(unMask(e.target.value), ['(99) 9999-9999', '(99) 9 9999-9999']));
    }

    /**
    * Salva a sigla do estado selecionado
    * @param {*} e 
    */
  
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <div className="box-main">

                        <header>Adicionar Fornecedor</header>

                        <nav className="box-nav">
                            <ul className="box-nav-ul">

                                <li className="box-nav-li">
                                    <Link className="box-nav-link" to="/providers">Fornecedores</Link>
                                </li>

                                <li className="box-nav-li">
                                    <Link className="box-nav-link" to="/provider-add">Adicionar Fornecedor</Link>
                                </li>

                            </ul>
                        </nav>

                        <div className="box-body">

                            <form onSubmit={onSubmit} action="" className="box-form">

                                <div className="form-group">
                                    <label htmlFor="name"><b>Nome:</b></label>
                                    <input type="text" className="form-input" name="name" onChange={onChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="CNPJ/CPF"><b>CPF/CNPF:</b></label>
                                    <input type="text" classNecomizarame="form-input" name="cpf" value={cnpj} onChange={cnpjChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address"><b>Endereço:</b></label>
                                    <input type="text" className="form-input" name="address" onChange={onChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="distric"><b>Bairro/Distrito:</b></label>
                                    <input type="text" className="form-input" name="district" onChange={onChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cep"><b>CEP:</b></label>
                                    <input type="text" className="form-input" name="cep" value={cep} onChange={cepChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city"><b>Município:</b></label>
                                    <input type="text" className="form-input" name="city" onChange={onChange} required />
                                </div>

                                <div className="form-group">
                                    <select onChange={(event) => {setUf(event.target.value);}} className="form-select">
                                        <option id="uf" value="AC">Acre</option>
                                        <option id="uf" value="AL"selected>Alagoas</option>
                                        <option id="uf" value="AP">Amapá</option>
                                        <option id="uf" value="AM">Amazonas</option>
                                        <option id="uf" value="BA">Bahia</option>
                                        <option id="uf" value="CE">Ceará</option>
                                        <option id="uf" value="ES">Espŕito Santo</option>
                                        <option id="uf" value="GO">Goiás</option>
                                        <option id="uf" value="MA">Maranhão</option>
                                        <option id="uf" value="MT">Mato Grosso</option>
                                        <option id="uf" value="MS">Mato Grosso do Sul</option>
                                        <option id="uf" value="MG">Minas Gerais</option>
                                        <option id="uf" value="PA">Pará</option>
                                        <option id="uf" value="PB">Paraiba</option>
                                        <option id="uf" value="PR">Paraná</option>
                                        <option id="uf" value="PE">Pernambuco</option>
                                        <option id="uf" value="PI">Piauí</option>
                                        <option id="uf" value="RJ">Rio de Janeiro</option>
                                        <option id="uf" value="RN">Rio Grande do Norte</option>
                                        <option id="uf" value="RS">Rio Grande do sul</option>
                                        <option id="uf" value="RO">Rondônia</option>
                                        <option id="uf" value="RR">Roraima</option>
                                        <option id="uf" value="SC">Santa Catarina</option>
                                        <option id="uf" value="SP">São Paulo</option>
                                        <option id="uf" value="SE">Sergipe</option>
                                        <option id="uf" value="TO">Tocantins</option>
                                        <option id="uf" value="DF">Distrito Federal</option>
                                    </select>
                                    {/* <label htmlFor="state"><b>Estado:</b></label>
                                    <input type="text" className="form-input" name="state" onChange={onChange} required /> */}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone"><b>Fone/Fax:</b></label>
                                    <input type="text" className="form-input" name="phone" value={phone} onChange={phoneChange} required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state"><b>Inscrição Estadual:</b></label>
                                    <input type="text" className="form-input" name="subscription" onChange={onChange} required />
                                </div>

                                <div className="btn-group">
                                    <Link className="button" to="/user">Cancelar</Link>
                                    <button className="button" type="submit">Cadastrar</button>
                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}