const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
    headers: {
        authorization: '2933ea73-fce8-4b8c-8c43-9e1d4cba5420',
        'Content-Type': 'application/json'
    }
}

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

export function getProfile() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then((result) => handleResponse(result));
}

export function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => { return handleResponse(res) })
        .then((result) => { return result });
};

export async function saveCard(text, url) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: text,
            link: url
        })
    })
        .then(res => { return handleResponse(res) })
        .then((result) => { return result });
}

export function saveProfile(profile) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profile.name,
            about: profile.about
        })
    });
}

export function saveAvatar(profile) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: profile.avatar
        })
    });
}

export function removeCard(evt, cardData) {
    fetch(`${config.baseUrl}/cards/${cardData._id}`, {
        method: 'DELETE',
        headers: config.headers
    });
}

export async function unLike(cardData) {
    return await fetch(`${config.baseUrl}/cards/likes/${cardData._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => { return handleResponse(res) })
        .then((result) => { return result });
}

export async function like(cardData) {
    return await fetch(`${config.baseUrl}/cards/likes/${cardData._id}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => { return handleResponse(res) })
        .then((result) => { return result });
}