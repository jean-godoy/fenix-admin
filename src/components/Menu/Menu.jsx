import React from 'react';
import { Link } from 'react-router-dom';
import {
    FiHome,
    FiUsers,
    FiTruck,
    FiShoppingCart,
    FiPower,
    FiFilePlus,
    FiCheckCircle,
    FiBookOpen,
    FiBox,
    FiSettings,
    FiStopCircle,
    FiFileText,
    FiTrendingUp
} from "react-icons/fi";
import './menu.css';

export default props => {

    function status(e){
        e.preventDefault();
        alert("Rota em construção")
    }

    return (
        <div className="container-menu">
            <header className="header-menu">
                <span>Friday</span>
            </header>

            <nav className="nav-menu">
                <ul className="ul-menu">

                    <li className="li-menu">
                        <Link to="/" className="link-menu">
                            <FiHome className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Home</span>
                        </Link>
                    </li>

                    <div className="menu-hr"></div>

                    <li className="li-menu">
                        <Link to="/user" className="link-menu">
                            <FiUsers className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Usuarios</span>
                        </Link>
                    </li>

                    <li className="li-menu">
                        <Link to="/employees" className="link-menu">
                            <FiUsers className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Funcionários</span>
                        </Link>
                    </li>

                    <li className="li-menu">
                        <Link to="/providers" className="link-menu">
                            <FiTruck className="icon-menu" color="#efefef" size="20" />
                            <span className="span-menu">Fornecedores</span>
                        </Link>
                    </li>

                    <li className="li-menu">
                        <Link to="/faccoes" className="link-menu">
                            <FiShoppingCart className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Facções</span>
                        </Link>
                    </li>

                    <li className="li-menu">
                        <Link to="/almoxarifado" className="link-menu">
                            <FiBox className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Almoxarifado</span>
                        </Link>
                    </li>

                    <div className="menu-hr"></div>

                    <li className="li-menu">
                        <Link to="/cheking" className="link-menu">
                            <FiCheckCircle className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Liberação</span>
                        </Link>
                    </li>

                    <li className="li-menu">
                        <Link to="/ordem-producao" className="link-menu">
                            <FiFilePlus className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Garregar O.P.</span>
                        </Link>
                    </li>

                    <li className="li-menu">
                        <Link to="/estoque" className="link-menu">
                            <FiBookOpen className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Estoque</span>
                        </Link>
                    </li>

                    <li className="li-menu">
                        <Link to="/romaneios" className="link-menu">
                            <FiShoppingCart className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Romaneios</span>
                        </Link>
                    </li>

                    <li className="li-menu">
                        <Link to="/finalizados" className="link-menu">
                            <FiStopCircle className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Finalizados</span>
                        </Link>
                    </li>

                    <div className="menu-hr"></div>

                    <li className="li-menu">
                        <Link to="/financeiro" className="link-menu" >
                            <FiTrendingUp className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Financeiro</span>
                        </Link>
                    </li>

                    <li className="li-menu">
                        <Link to="" className="link-menu" onClick={status}>
                            <FiFileText className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">NF-e</span>
                        </Link>
                    </li>

                    <div className="menu-hr"></div>

                    <li className="li-menu">
                        <Link to="/configurações" className="link-menu">
                            <FiSettings className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Configurações</span>
                        </Link>
                    </li>

                     <li className="li-menu">
                        <Link to="/logout" className="link-menu">
                            <FiPower className="icon-menu"  color="#efefef" size="20" />
                            <span className="span-menu">Sair</span>
                        </Link>
                    </li>

                    

                </ul>
            </nav>
        </div>
    );
}