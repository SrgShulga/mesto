import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelecor, {formSubmitCallback}) {
    super(popupSelecor);
    this._formSubmitCallback = formSubmitCallback;
    this ._popupFormItem = this._popupItem.querySelector('.popup__form');
    this._popupInputList = Array.from(this._popupFormItem.querySelectorAll('.popup__input'));
    this._submitBtn = this._popupItem.querySelector('.popup__submit-btn');
    this._submitBtnText = this._submitBtn.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._popupInputList.forEach(input => formValues[input.name] = input.value);

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
      this.close();
    })
  }

  putSavingProcessNotice() {
    this._submitBtn.textContent = 'Сохранение...';
  }

  removeSavingProcessNotice() {
    this._submitBtn.textContent = this._submitBtnText;
  }

  close() {
    super.close();
    this._popupFormItem.reset()
  }
};
