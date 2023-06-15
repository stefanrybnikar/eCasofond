const serverUrl = "http://localhost:8080";
const urlDir = "/v1";
const fetchUrl = serverUrl + urlDir;

let authToken = "";

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

const basicAuth = btoa("user:user");

const token = async () => {
    const response = await fetch(fetchUrl + "/auth/token",
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Basic ${basicAuth}`
            }
        });
    authToken = await response.text();
    console.log(authToken);
};


export default { get, post, put, del, token };
