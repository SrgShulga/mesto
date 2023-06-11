import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupItem.querySelector('.popup__figure-pic');
    this._popupCaption = this._popupItem.querySelector('.popup__figure-caption');
  }

  open(title, image) {
    this._popupCaption.textContent = title;
    this._popupImage.src = image;
    this._popupImage.alt = title;
    super.open();
  }
};
