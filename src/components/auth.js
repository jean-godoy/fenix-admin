export const isAuthenticated = () => {

    return !!localStorage.getItem('@token_fenix');

}