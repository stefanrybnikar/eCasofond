export const getToken = () => {
    const token = sessionStorage.getItem('token');
    return token;
};

export const getUsername = () => {
    const token = sessionStorage.getItem('username');
    return token;
};

const setToken = (token: string) => {
    sessionStorage.setItem('token', token);
};

const setUsername = (username: string) => {
    sessionStorage.setItem('username', username);
};

export const clearSession = () => {
    sessionStorage.clear();
};

export const setLoggedSession = (username: string, token: string) => {
    setToken(token);
    setUsername(username);
}