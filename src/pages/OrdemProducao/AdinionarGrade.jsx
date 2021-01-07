import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus } from "react-icons/fi";
import api from '../../api';


//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
import DateFullIn from '../../components/Date/DateFullIn';

const initialValues = {
   op: '',
   grade: '',
   quantidade: ''
}

export default props => {

    const ordem_prod = props.match.params.id;
    const [data, setData] = useState(initialValues);
    const dateFullIn = DateFullIn(new Date());
    const [grade, setGrade] = useState([]);
    const history = useHistory();


    useEffect(() => {
        api.get('/grade/all').then(({data}) => {
            setGrade(data);
        }).catch(e => {
            return alert('Nenhuma rota cadastrada');
        });
    },[]);

    function onChange(e) {
        const { name, value } = e.target;
        setData({...data, [name]:value});
    }

    function onOption(e) {
        const { value } = e.target
        setData({...data, 'grade':value});
    }

    function onSubmit(e){
        e.preventDefault();

        const data_values = {
            op: ordem_prod,
            grade: data.grade,
            quantidade: data.quantidade
        }

        const data_string = JSON.stringify(data_values);
        console.log(data_string)
        api.post('/grade/grade-romaneio-add', data_string).then((res) => {
            alert("Grade para romaneio gerada com sucesso!");
        }).catch((e) => {
            alert("Ops.., problemas ao gerar a grade.. :(");
            console.log("Grade error :"+e);
        });
    }

    return(
        <>
            <Menu />
            <div className="container">

                <Header />
                
                <div className="box-main">

                    <header>Ordem Produção</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/ordem-producao">Adicionar Grade</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUserPlus className="box-body-icon" />
                            <span> > Adicionar Grade de Tamanhos, OP: {ordem_prod} </span>
                        </header>

                        <form onSubmit={onSubmit} className="box-form">

                            {/* <div className="form-group">
                                <label htmlFor=""><b>O.P:</b></label>
                                <input type="text" className="form-input" name="op" value={ordem_prod} onChange={onChange} required />
                            </div> */}

                            <div className="box-list">
                                <label for="cars">Selecione a Grade:</label>
                                <select className="box-list-ul" onChange={onOption} required>
                                {grade.length && grade.map(item => {
                                    return (                             
                                        <option key={item.id} value={item.grade} >Tamanho: {item.tamanho}</option>
                                    );
                                })}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor=""><b>Quantidade:</b></label>
                                <input type="text" className="form-input" name="quantidade" onChange={onChange} required />
                            </div>

                            <div className="btn-group">
                                <Link className="button" to="/ordem-producao">Cancelar</Link>
                                <button className="button" type="submit">Cadastrar Grade</button>
                            </div>

                        </form>
                    </div>

                </div>
                {/* box main */}

            </div>
        </>
    );
}