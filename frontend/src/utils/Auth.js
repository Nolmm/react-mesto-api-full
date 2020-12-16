class Auth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }


    register(data) {
        return fetch(`${this._baseUrl}/signup`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    password: data.password,
                    email: data.email
                })
            })
            .then((res) => res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`));
    }

    login(data) {
        return fetch(`${this._baseUrl}/signin`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    password: data.password,
                    email: data.email
                })
            })
            .then((res) => res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`));
    }

    getToken() {
        const jwt = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'GET',
                headers: {
                    ...this._headers,
                    "Authorization": `Bearer ${jwt}`
                }
            })
            .then(res => res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`));
    }
}

const auth = new Auth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        "Content-Type": "application/json"
    }
})

export default auth;