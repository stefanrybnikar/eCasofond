export const getToken = () => {
    const token = sessionStorage.getItem('token');
    return token;
};

export const setToken = (token: string) => {
    sessionStorage.setItem('token', token);
};