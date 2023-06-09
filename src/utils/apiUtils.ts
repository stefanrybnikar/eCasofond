import { getToken, setLoggedSession } from "./session";

const serverUrl = "http://localhost:8080";
const urlDir = "/v1";
const fetchUrl = serverUrl + urlDir;

let authToken = getToken();

const get = async (link: string) => {
    return await fetch(fetchUrl + link,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        }).then(response => response.ok ? response.json() : false);
};

const post = async (link: string, data: object) => {
    return await fetch(fetchUrl + link,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(data),
        }).then(response => response.ok ? response.json() : false);
};

const put = async (link: string, data: object) => {
    return await fetch(fetchUrl + link,
        {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(data),
        }).then(response => response.ok ? response.json() : false);
};

const del = async (link: string) => {
    return await fetch(fetchUrl + link,
        {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        });
};

// const login = async (username: string, password: string) => {
//     return await fetch(fetchUrl + "/auth/login",
//         {
//             method: 'POST',
//             mode: 'cors',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 username,
//                 password
//             }),
//         });
// };

// const logout = async () => {
//     return await fetch(fetchUrl + "/auth/logout",
//         {
//             method: 'POST',
//             mode: 'cors'
//         });
// };

const token = async (username: string, password: string) => {

    const basicAuth = btoa(`${username}:${password}`);

    const response = await fetch(fetchUrl + "/auth/token",
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Basic ${basicAuth}`
            }
        });

    if(!response.ok) return false;

    setLoggedSession(
        username,
        await response.json().then(response => response.data)
    );
    
    const token = getToken();
    authToken = token;

    return true;
};


export default {get, post, put, del, token};
