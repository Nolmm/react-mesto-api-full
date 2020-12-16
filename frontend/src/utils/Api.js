class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl
        this._token = token;

    }

    getItems(url) {
        return fetch(/*`${this.baseUrl}/users/me`*/this._baseUrl + url, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })

            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    patchUserInfo(url, value) {
        return fetch(/*`${this.baseUrl}/users/me`*/this._baseUrl + url, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: /*'Marie Skłodowska Curie',*/value.name,
                about: /*'Physicist and Chemist'*/value.about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }


    postNewCard(url, values) {
        return fetch(this._baseUrl + url, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                link: values.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    patchAvatar(url, item) {
        return fetch(this._baseUrl + url, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: item.avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }


    deleteItems(url) {
        return fetch(this._baseUrl + url, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    putLike(url) {
        return fetch(this._baseUrl + url, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-15/', 'ec958303-2883-4fc9-affb-18ff9d007ba6')
export default api;