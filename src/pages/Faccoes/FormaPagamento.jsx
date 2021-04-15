import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import api from '../../api';
import './faccao.css';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

export default props => {

    const faccao_code = props.match.params.faccao_code;
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const [status, setStatus] = useState(null);

    useEffect(() => {
        api.get(`/api/form-payment/payment-status/${faccao_code}`).then(({ data }) => {
            setData(data)
            setStatus(data.status)
            handleStatus();
           
        }).catch(e => {
            console.log(e);

        });
    }, []);

    function handleSave(e) {
        e.preventDefault();

        const data_values = {
            status: status,
            form_payment: name,
            faccao_code: faccao_code,
        }

        const data_string = JSON.stringify(data_values);
        
        if (name !== "") {

            if (!data) {
                api.post('/api/form-payment/create', data_string).then((data) => {
                    alert('Status gerado cadastrado com sucesso!')
                }).catch(e => {
                    alert('Erro no servidor')
                    return console.log(e);
                });
            }
           
            if(data !== null) {
                api.put('/api/form-payment/update', data_string).then((data) => {
                   if( data.data === true){
                       alert('Status alterado com sucesso!');
                   } else {
                    alert('Erro ao alterar o status.., Tente novamente mais tarde!');
                   }
                }).catch(e => {
                    alert('Erro no servidor')
                    return console.log(e);
                });
            }
        }
    }
    
    const handleStatus = () => {
        let elements = document.querySelectorAll('input[type="radio"]');
        
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].value == status) {
                elements[i].checked = true;
            }
        }
    };

   

    const handleCheck = e => {
        const { value, id } = e.target;
        setStatus(Number(value))
        setName(id);
    };

    function Alert() {
        return (
            <div className="alert">
                <h3>Nenhuma forma de pagamento selecionada!</h3>
            </div>
        );
    };
   
    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Forma de Pagamento</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/faccoes">Voltar</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to={`/faccoes/dados-bancarios/${faccao_code}`}>Dados Bancarios</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to={`/faccoes/forma-pagamento/${faccao_code}`}>Forma de Pagamento</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Forma de Pagamento</span>
                        </header>
                        {(!data) ? <Alert /> : ''}
                        <div className="box-data">

                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <input type="radio" name="status" onChange={({ target:{checked} }) => handleCheck({target:{id: 'Dinehiro', value:1 }})} checked={1 === status} />
                                    
                                    <label htmlFor="Dinehiro">Dinheiro</label>
                                </span>
                            </div>
                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <input type="radio" name="status" onChange={({ target:{checked} }) => handleCheck({target:{id: 'Transferencia',value:2 }})} onClick={handleCheck} checked={2 === status} />
                                    <label htmlFor="Transferencia">Transferencia Bancária</label>
                                </span>
                            </div>
                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <input type="radio" name="status" onChange={({ target:{checked} }) => handleCheck({target:{id: 'PIX',value:3 }})} onClick={handleCheck} checked={3 === status} />
                                    <label htmlFor="PIX">PIX</label>
                                </span>
                            </div>
                            <div className="box-data-group">
                                <span className="data-group-span">
                                    <input type="radio" name="status" onChange={({ target:{checked} }) => handleCheck({target:{id: 'Cheque',value:4 }})} onClick={handleCheck} checked={4 === status} />
                                    <label htmlFor="Cheque">Cheque</label>
                                </span>
                            </div>

                            <div className="btn-group">
                                {/* <Link className="button" to={`/faccao-edit/${id}`}>Editar</Link> */}
                                <Link className="button" to="/faccoes">Voltar</Link>
                                <button className="button" onClick={handleSave}>Alterar Status</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
