import React from 'react';
import './home.css';

//componets
import Menu from '../../components/Menu/Menu';
import Header from '../../components/Header/Header';
console.log("URL: "+process.env.REACT_APP_URL)
export default props => {

    return (
        <>
            <Menu />
            <div className="container">

                <Header />

                <div className="box-main">

                    <header><b>Home</b></header>

                    

                </div>
               
            </div>
        </>
    );
}