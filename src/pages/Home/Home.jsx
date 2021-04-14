import React from 'react';
import './home.css';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';


export default props => {

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header><b>Dashboard</b></header>

                    <div className="box-dashboard">

                        <div className="box-romaneios-quantidade bs">
                            <div className="dash-header">
                                <h3>Romaneios</h3>
                            </div>
                            <div className="dash-group">
                                <b>Total:</b> 580
                            </div>
                            <div className="dash-group">
                                <b>Expedição:</b> 380
                            </div>
                            <div className="dash-group">
                                <b>Finalizados:</b> 200
                            </div>
                        </div>

                    </div>

                </div>
               
            </div>
        </>
    );
}