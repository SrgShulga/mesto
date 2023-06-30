import { Popup } from "./Popup";

export class PopupConfirm extends Popup {
  constructor(popupSelector, {confirmCallback}) {
    super(popupSelector);
    this._submitButton = this._popupItem.querySelector('.popup__form');
    this._confirmCallback = confirmCallback
  }

  open(cardObject, cardId) {
    this._cardObject = cardObject;
    this._cardId = cardId
    super.open();
  }

  setEventListeners() {
    this._submitButton.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._confirmCallback(this._cardObject, this._cardId);
    })
    super.setEventListeners();
  }
}
