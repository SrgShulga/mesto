export class Card {
  constructor(cardObject, templateSelector, userId, authorData, handleActions) {
    this._card = cardObject;
    this._cardTitle = this._card.name;
    this._cardImage = this._card.link;
    this._cardTemplate = templateSelector

    this._userId = userId;
    this._cardId = authorData.cardId;
    this._ownerId = authorData.ownerId

    this._cardClick = handleActions.handleCardClick;
    this._cardDelete = handleActions.handleCardDelete;
    this._addLike = handleActions.handleCardAddLike;
    this._removeLike = handleActions.handleCardRemoveLike

  }

  _cloneCardTemplate() {
    return document.querySelector(this._cardTemplate).content.querySelector('.element__card').cloneNode(true);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  renderCardLikes(card) {
    this._likeCounter = card.likes;
    if (this._likeCounter.length === 0) {
      this.likeSelector.textContent = '';
    } else {
      this.likeSelector.textContent = this._likeCounter.length
    };
    if (this._cardIsLiked()) {
      this._cardLikeBtn.classList.add('element__like-btn_active');
    } else {
      this._cardLikeBtn.classList.remove('element__like-btn_active');
    }
  }

  _cardIsLiked() {
    return this._likeCounter.find((userLike) => userLike._id === this._userId);
  }

  _likeToggle() {
    if (this._cardIsLiked()) {
      this._removeLike(this._cardId);
    } else {
      this._addLike(this._cardId);
    }
  }

  generateCard() {
    this._cardElement = this._cloneCardTemplate();
    this._elementImage = this._cardElement.querySelector('.element__card-image');
    this._elementTitle = this._cardElement.querySelector('.element__title');
    this._cardLikeBtn = this._cardElement.querySelector('.element__like-btn');
    this._cardDeleteBtn = this._cardElement.querySelector('.element__delete-btn');
    this.likeSelector = this._cardElement.querySelector('.element__like-counter');

    this._elementTitle.textContent = this._cardTitle;
    this._elementImage.src = this._cardImage;
    this._elementImage.alt = this._cardTitle;
    this.renderCardLikes(this._card)
    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners = () => {
    this._cardLikeBtn.addEventListener('click', () => this._likeToggle());
    this._elementImage.addEventListener('click', () => {
      this._cardClick(this._cardTitle, this._cardImage);
    });
    if (this._userId === this._ownerId) {
      this._cardDeleteBtn.addEventListener('click', () => this._cardDelete(this, this._cardId));
    } else {
      this._cardDeleteBtn.remove();
    }
  }
}
