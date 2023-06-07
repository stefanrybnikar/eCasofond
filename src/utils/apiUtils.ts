const fetchUrl = "http://localhost:8080"

export const get = async (link: string) => {
    return await fetch(fetchUrl + link,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
    }).then(response => response.json())
}

export const post = async (link: string, data: object) => {
    return await fetch(fetchUrl + link,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
}

export const del = async (link: string) => {
  return await fetch(fetchUrl + link,
      {
          method: 'DELETE',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
      }).then(response => response.json())
}