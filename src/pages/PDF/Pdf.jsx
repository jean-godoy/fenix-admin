import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';
import api from '../../api';



//components
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';

import pdf_file from '../../pages/PDF/model.pdf';

export default props => {
    

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header>Romaneio</header>

                    <nav className="box-nav">
                        <ul className="box-nav-ul">

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/employees">Funcionários</Link>
                            </li>

                            <li className="box-nav-li">
                                <Link className="box-nav-link" to="/Employee-add">Adicionar Funcionário</Link>
                            </li>

                        </ul>
                    </nav>

                    <div className="box-body">
                        <header>
                            <FiUsers className="box-body-icon" />
                            <span> > Converter PDF</span>
                        </header>



                    </div>


                </div>

            </div>
        </>
    );
}