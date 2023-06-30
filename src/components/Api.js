export class Api {
  constructor({link, headers}) {
    this._link = link;
    this._headers = headers;
  }

  _serverResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
    })
      .then(res => {
        return this._serverResponse(res);
      })
  }

  getInitialCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers
    })
      .then(res => {
        return this._serverResponse(res);
      })
  }

  sendUserInfo(profileInfo) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: profileInfo.userName,
        about: profileInfo.userDescription
      })
    })
    .then(res => {
      return this._serverResponse(res);
    })
  }

  createNewCard({name, link}) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({name, link})
    })
      .then(res => {
        return this._serverResponse(res);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._link}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => {
        return this._serverResponse(res);
      })
  }

  putCardLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT'
    })
      .then(res =>{
        return this._serverResponse(res);
      })
  }

  deleteCardLike(cardId) {
    return fetch(`${this._link}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => {
        return this._serverResponse(res);
      })
  }

  sendAvatarData(link) {
    return fetch(`${this._link}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: link.avatarUrl })
    })
      .then(res => {
        return this._serverResponse(res);
      })
  }
}
