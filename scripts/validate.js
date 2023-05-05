const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);

  } else {
    hideInputError(formElement, inputElement);
    };
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    })
  })
};

const hasValidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasValidInput(inputList)) {
    buttonElement.classList.add(config.disabledButtonClass)
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.disabledButtonClass)
    buttonElement.disabled = false;
  }
};

const enableValidation = (config)=> {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  });
};

const hideActiveInputError = (form, input, secondInput) => {
  const error = Array.from(form.querySelectorAll('.popup__input-error'));
  if (input.classList.contains(config.inputErrorClass) || secondInput.classList.contains(config.inputErrorClass)) {
    input.classList.remove(config.inputErrorClass);
    secondInput.classList.remove(config.inputErrorClass);
    error.forEach((errorMessage) => {
      errorMessage.classList.remove(config.errorClass);
      errorMessage.textContent = '';
    })};
  };

enableValidation (config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  disabledButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_data_error',
  errorClass: 'popup__input-error_visible',
});
