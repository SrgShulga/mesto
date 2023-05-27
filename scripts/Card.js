class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._title = cardData.name;
    this._image = cardData.link;
    this._template = templateSelector;
    this._cardElement = document.querySelector(this._template).content.querySelector('.element__card').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.element__card-image');
    this._cardTitle = this._cardElement.querySelector('.element__title');
    this._cardLikeBtn = this._cardElement.querySelector('.element__like-btn');
    this._cardDeleteBtn = this._cardElement.querySelector('.element__delete-btn');
    this._handleCardClick = handleCardClick;
  }

  _handleCardDelete = (evt) => {
    this._cardElement.remove();
  }

  _handleLike = (evt) => {
    evt.target.classList.toggle('element__like-btn_active');
  }

  _setEventListeners = () => {
    this._cardLikeBtn.addEventListener('click', (evt) => this._handleLike(evt));
    this._cardDeleteBtn.addEventListener('click', (evt) => this._handleCardDelete(evt));
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image)
    });
}

  generateCard() {
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._setEventListeners();

    return this._cardElement;
  }
};

export {Card};
