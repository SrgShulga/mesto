import {openPopup, zoomImagePopup, zoomImagePopupCaption, zoomImagePopupPic, cardTemplate} from './index.js';

class Card {
  constructor(cardData, templateSelector) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._template = templateSelector;
  }

  _handleCardDelete = (evt) => {
    evt.target.closest('.element__card').remove();
  }

  _handleLike = (evt) => {
    evt.target.classList.toggle('element__like-btn_active');
  }

  _openZoomImagePopup() {
    zoomImagePopupCaption.textContent = this._title;
    zoomImagePopupPic.src = this._image;
    zoomImagePopupPic.alt = this._title;
    openPopup(zoomImagePopup);
  }

  _setEventListeners = (cardElement) => {
    cardElement.querySelector('.element__like-btn').addEventListener('click', (evt) => this._handleLike(evt));
    cardElement.querySelector('.element__delete-btn').addEventListener('click', (evt) => this._handleCardDelete(evt));
    cardElement.querySelector('.element__card-image').addEventListener('click', () => this._openZoomImagePopup());
}

  generateCard() {
    const cardElement = cardTemplate.content.querySelector('.element__card').cloneNode(true);

    cardElement.querySelector('.element__title').textContent = this._title;
    cardElement.querySelector('.element__card-image').src = this._image;
    cardElement.querySelector('.element__card-image').alt = this._title;
    this._setEventListeners(cardElement);

    return cardElement;
  }

};

export {Card};
