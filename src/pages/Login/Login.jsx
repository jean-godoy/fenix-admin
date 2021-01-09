import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiUserCheck, FiLock } from 'react-icons/fi';
import api from '../../api';
import './login.css'

const initialValues = {
    user_name: '',
    user_pass: '',
}

export default props => {

    const history = useHistory();
    const [values, setValues] = useState(initialValues);

    //função que verifica se existe um token 
    useEffect(() => {
        if (localStorage.getItem('@token_fenix')) {
            return history.push('/');
        }
    }, []);

    function onChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    function onSubmit(e) {
        e.preventDefault();
        
        const data_string = JSON.stringify(values)

        api.post('/auth/checked', data_string).then(({ data }) => {
            
            if (data.user_pass === values.user_pass) {

                const user_data = {
                    user_id: data.id_user,
                    user_name: data.user_name,
                    token: data.token,
                    user_email: data.user_email
                }

                localStorage.setItem('@friday_user_data', JSON.stringify(user_data));
                localStorage.setItem('@token_fenix', true);

                return history.push('/');

            } else {
                alert("Usuario ou Senha não Conferem!")
                setValues(initialValues);
            }

        }).catch((e) => {
            console.log("error :" + e)
        })
    }
    
    return (

        <div className="box">


            <form onSubmit={onSubmit} className="form">
                <h1>Login</h1>
                <div className="box-login-ico">
                    <FiUserCheck color="#331" size={24} fontWeight="bold" />
                    <input className="login-inp" type="text" name="user_name" placeholder="Nome de Usuario" value={values.user_name} onChange={onChange} />
                </div>

                <div className="box-login-ico">
                    <FiLock color="#331" size={24} fontWeight="bold" />
                    <input className="login-inp" type="password" name="user_pass" id="" placeholder="Password" value={values.user_pass} onChange={onChange} />
                </div>

                <button className="login-bt-sub" type="submit">Entrar</button>
            </form>

        </div>

    )
}