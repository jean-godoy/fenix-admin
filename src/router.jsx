import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './components/Pikasso/Global.css';

//checking authentication
import { isAuthenticated } from './components/auth';

//pages

//login
import Login    from './pages/Login/Login';
import Logout   from './pages/Login/Logout';

//home
import Home         from './pages/Home/Home';

//user
import User         from './pages/User/User'; 
import UserAdd      from './pages/User/UserAdd';
import UserDetails  from './pages/User/UserDetails';
import UserEdit     from './pages/User/UserEdit';

//employees
import Employees        from './pages/Employees/Employees';
import EmployeeAdd      from './pages/Employees/EmployeeAdd';
import EmployeeDetails  from './pages/Employees/EmployeeDetails';
import EmployeeEdit     from './pages/Employees/EmployeeEdit';

//providers
import Providers        from './pages/Providers/Providers';
import ProviderAdd      from './pages/Providers/ProviderAdd';
import ProviderDetails  from './pages/Providers/ProviderDetails';
  
//almoxarifado
import Almoxarifado         from './pages/Almoxarifado/Almoxarifado.jsx';
import AlmoxarifadoAdd      from './pages/Almoxarifado/AlmoxarifadoAdd';
import AlmoxarifadoDetails  from './pages/Almoxarifado/AlmoxarifadoDetails';

//facções
import Faccoes          from './pages/Faccoes/Faccaoes';
import FaccaoAdd        from './pages/Faccoes/FaccaoAdd';
import FaccaoDetails    from './pages/Faccoes/FaccaoDetails';
import DadosBancarios   from './pages/Faccoes/DadosBancarios';
import FormaPagamento   from './pages/Faccoes/FormaPagamento';
import FaccaoEdit       from './pages/Faccoes/FaccaoEdit';

//checking
import Cheking      from './pages/Cheking/Checking';
import CheckAdd     from './pages/Cheking/CheckAdd';
import CheckEdit    from './pages/Cheking/CheckDetails';

//Ordem Procudao
import OrdemProducao    from './pages/OrdemProducao/OrdemProducao';
import OrdemProducaoAdd from './pages/OrdemProducao/OrdemProducaoAdd';
import GradeAdd         from './pages/OrdemProducao/AdinionarGrade';

//Romaneios
import Romaneios            from './pages/Romaneios/Romaneios';
import RomaneioExpedicao    from './pages/Romaneios/RomaneioExpedicao';
import RomaneioId           from './pages/Romaneios/RomaneioId';

//Estoque
import Estoque      from './pages/Estoque/Estoque';
import EstoqueGet   from './pages/Estoque/EstoqueGet';

//configuracoes
import Config           from './pages/Config/Config';
import Status           from './pages/Config/Status';
import RegrasNegocio    from './pages/Config/RegrasNegocio';
import StatusRomaneio   from './pages/Config/StatusRomaneio';

// Finalização
import Finalizacao              from './pages/Finalizacao/Finalizacao';
import FaccaoRomaneioDescricao  from './pages/Finalizacao/FaccaoRomaneioDescricao';

//Financeiro
import Financeiro           from './pages/Financeiro/Financeiro';
import TabelaPagametos      from './pages/Financeiro/TabelaPagamentos';
import Finalizados          from './pages/Financeiro/Finalizados';
import FinalizadosList      from './pages/Financeiro/FinalizadosList';
import ContasReceber        from './pages/Financeiro/ContasReceber';
import ContasPagar          from './pages/Financeiro/ContasPagar';
import FaccoesPagamentos    from  './pages/Financeiro/FaccoesPagamentos';
import FaccaoPagamentoByNfe from './pages/Financeiro/FaccaoPagamentoByNfe';

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

                    {/* Almoxarifado Router */}
                    <PrivateRoute exact path="/almoxarifado" component={Almoxarifado} />
                    <PrivateRoute exact path="/almoxarifado-add" component={AlmoxarifadoAdd} />
                    <PrivateRoute exact path="/almoxarifado-details/:id" component={AlmoxarifadoDetails} />

                    {/* Facção Router */}
                    <PrivateRoute exact path="/faccoes" component={Faccoes} />
                    <PrivateRoute exact path="/faccao-add" component={FaccaoAdd} />
                    <PrivateRoute exact path="/faccao-details/:id" component={FaccaoDetails} />
                    <PrivateRoute exact path="/faccoes/dados-bancarios/:faccao_code" component={DadosBancarios} />
                    <PrivateRoute exact path="/faccoes/forma-pagamento/:faccao_code" component={FormaPagamento} />
                    <PrivateRoute exact path="/faccao-editar/:id" component={FaccaoEdit} />

                    {/* Checking Router */}
                    <PrivateRoute exact path="/cheking" component={Cheking} />
                    <PrivateRoute exact path="/check-add" component={CheckAdd} />
                    <PrivateRoute exact path="/check-edit/:id" component={CheckEdit} />

                    {/* Ordem Producao Router */}
                    <PrivateRoute exact path="/ordem-producao" component={OrdemProducao} />
                    <PrivateRoute exact path="/ordem-producao-add/:id" component={OrdemProducaoAdd} />
                    <PrivateRoute exact path="/grade-add/:id" component={GradeAdd} />

                    {/* Romaneios Route */}
                    <PrivateRoute exact path="/romaneios" component={Romaneios} />
                    <PrivateRoute exact path="/romaneio/expedicao" component={RomaneioExpedicao} />
                    <PrivateRoute exact path="/romaneio/:nfe" component={RomaneioId} />
                   

                    {/* Estoque Route */}
                    <PrivateRoute exact path="/estoque" component={Estoque} />
                    <PrivateRoute exact path="/estoque/get/:id" component={EstoqueGet} />

                    {/* Configurações */}
                    <PrivateRoute exact path="/configurações" component={Config} />
                    <PrivateRoute exact path="/configurações/status-do-romaneio" component={StatusRomaneio} />
                    <PrivateRoute exact path="/configurações/regras-de-negocio" component={RegrasNegocio} />
 
                    {/* finalizacao */}
                    <PrivateRoute exact path="/finalizados" component={Finalizacao} />
                    <PrivateRoute exact path="/finalização/facção-romaneio/:faccao_code/:op" component={FaccaoRomaneioDescricao} />

                    {/* Financeiro routes */}
                    <PrivateRoute exact path="/financeiro" component={Financeiro} />
                    <PrivateRoute exact path="/tabela-pagamentos" component={TabelaPagametos} />
                    <PrivateRoute exact path="/financeiro-finalizados" component={Finalizados} />
                    <PrivateRoute exact path="/financeiro/finalizados-lista/:nfe" component={FinalizadosList} />
                    <PrivateRoute exact path="/financeiro/contas-a-receber" component={ContasReceber} />
                    <PrivateRoute exact path="/financeiro/contas-a-pagar" component={ContasPagar} />
                    <PrivateRoute exact path="/financeiro/faccoes-pagamentos" component={FaccoesPagamentos} />
                    <PrivateRoute exact path="/financeiro/pagamentos-referente-nfe/:nfe"  component={FaccaoPagamentoByNfe} />

                </Switch>
            </BrowserRouter>

        </div>
    );
}
