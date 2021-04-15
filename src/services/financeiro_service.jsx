import api from './../api';
export const teste = (nome) => {
    alert(nome)
}

export const Financeiro = () => {


    function get() {
        return api.get('/users/')
        // console.log(res)
    }
    get();
    return get()
}

