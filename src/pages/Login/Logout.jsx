import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'
import Menu from '../../components/Menu/Menu';

export default props => {
   const history = useHistory();
   const [data, setData] = useState([]);

   useEffect(() => {
      const req = JSON.parse(localStorage.getItem('@friday_user_data'));
      setData(req);
   }, []);

   function logOut() {

      localStorage.removeItem('@token_fenix');
      return history.push('/login')

   }

   return (
      <>
         <Menu />
         <div className="cont-log-out">
            <header> {data.user_name}, Deseja Realmente Sair?</header>

            <div className="box-bt">
               <Link className="log-bt" to="/">Cancelar</Link>
               {/* <a className="log-bt" href="/">Cancelar</a> */}
               <button className="log-bt alert" onClick={logOut}>Sair</button>
            </div>

         </div>
      </>
   )


}




