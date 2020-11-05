import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './components/Pikasso/Global.css';

//checking authentication
import { isAuthenticated } from './components/auth';

//pages

//login
import Login from './pages/Login/Login';
import Logout from './pages/Login/Logout';

//home
import Home from './pages/Home/Home';

//user
import User from './pages/User/User'; 
import UserAdd from './pages/User/UserAdd';
import UserDetails from './pages/User/UserDetails';
import UserEdit from './pages/User/UserEdit';

//employees
import Employees from './pages/Employees/Employees';
import EmployeeAdd from './pages/Employees/EmployeeAdd';
import EmployeeDetails from './pages/Employees/EmployeeDetails';
import EmployeeEdit from './pages/Employees/EmployeeEdit';

//providers
import Providers from './pages/Providers/Providers';
import ProviderAdd from './pages/Providers/ProviderAdd';
import ProviderDetails from './pages/Providers/ProviderDetails';
  
//almoxarifado
import Almoxarifado from './pages/Almoxarifado/Almoxarifado.jsx';
import AlmoxarifadoAdd from './pages/Almoxarifado/AlmoxarifadoAdd';
import AlmoxarifadoDetails from './pages/Almoxarifado/AlmoxarifadoDetails';

//facções
import Faccoes from './pages/Faccoes/Faccaoes';
import FaccaoAdd from './pages/Faccoes/FaccaoAdd';
import FaccaoDetails from './pages/Faccoes/FaccaoDetails';

//checking
import Cheking from './pages/Cheking/Checking';
import CheckAdd from './pages/Cheking/CheckAdd';

//pdf convert
import PDF from './pages/PDF/Pdf';

export default props => {

    const PrivateRoute = ({ component: Component, ...rest }) => ( <
        Route {...rest }
        render = {
            (props) =>
            isAuthenticated() ? ( <
                Component {...props }
                />
            ) : ( <
                Redirect to = {
                    { pathname: "/login", state: { from: props.location } } }
                />
            )
        }
        />
    )

    return (
        <div className="boat">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />

                    {/* Login Router */}
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/logout" component={Logout} />

                    {/* Users Router */}
                    <PrivateRoute exact path="/user" component={User} />
                    <PrivateRoute exact path="/user-add" component={UserAdd} />
                    <PrivateRoute exact path="/user-details/:id" component={UserDetails} />
                    <PrivateRoute exact path="/user-edit/:id" component={UserEdit} />

                    {/* { Employees Router } */}
                    <PrivateRoute exact path="/employees" component={Employees} />
                    <PrivateRoute exact path="/employee-add" component={EmployeeAdd} />
                    <PrivateRoute exact path="/employee-details/:id" component={EmployeeDetails} />
                    <PrivateRoute exact path="/employee-edit/:id" component={EmployeeEdit} />

                    {/* { Providers Router } */}
                    <PrivateRoute exact path="/providers" component={Providers} />
                    <PrivateRoute exact path="/provider-add" component={ProviderAdd} />
                    <PrivateRoute exact path="/provider-details/:id" component={ProviderDetails} />

                    {/* PDF Router */}
                    <PrivateRoute exact path="/get-pdf" component={PDF} />

                    {/* Almoxarifado Router */}
                    <PrivateRoute exact path="/almoxarifado" component={Almoxarifado} />
                    <PrivateRoute exact path="/almoxarifado-add" component={AlmoxarifadoAdd} />
                    <PrivateRoute exact path="/almoxarifado-details/:id" component={AlmoxarifadoDetails} />

                    {/* Facção Router */}
                    <PrivateRoute exact path="/faccoes" component={Faccoes} />
                    <PrivateRoute exact path="/faccao-add" component={FaccaoAdd} />
                    <PrivateRoute exact path="/faccao-details/:id" component={FaccaoDetails} />

                    <PrivateRoute exact path="/cheking" component={Cheking} />
                    <PrivateRoute exact path="/check-add" component={CheckAdd} />
                    
                </Switch>
            </BrowserRouter>

        </div>
    );
}