import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelecor, {formSubmitCallback}) {
    super(popupSelecor);
    this._formSubmitCallback = formSubmitCallback;
    this ._popupFormItem = this._popupItem.querySelector('.popup__form');
    this._popupInputList = Array.from(this._popupFormItem.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    this.formValues = {};
    this._popupInputList.forEach(input => this.formValues[input.name] = input.value);

    return this.formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._popupFormItem.reset()
  }
};
