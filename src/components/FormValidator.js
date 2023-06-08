export class FormValidator {
  constructor(classConfig, formElement) {
    this._config = classConfig;
    this._element = formElement
    this._submitElement = this._element.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._element.querySelectorAll(this._config.inputSelector));
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._element.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    };
  }

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasValidInput = () => {
    return Array.from(this._element.querySelectorAll(this._config.inputSelector)).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = () => {
    if (this._hasValidInput()) {
      this._submitElement.classList.add(this._config.disabledButtonClass);
      this._submitElement.disabled = true;
    } else {
      this._submitElement.classList.remove(this._config.disabledButtonClass);
      this._submitElement.disabled = false;
    };
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation = () => {
      this._setEventListeners();
  }
};
