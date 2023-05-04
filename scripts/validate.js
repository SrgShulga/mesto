const formClassList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  disabledButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_data_error',
  errorClass: 'popup__input-error_visible'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formClassList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formClassList.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formClassList.inputErrorClass);
  errorElement.classList.remove(formClassList.errorClass);
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
  const inputList = Array.from(formElement.querySelectorAll(formClassList.inputSelector));
  const buttonElement = formElement.querySelector(formClassList.submitButtonSelector);
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
    buttonElement.classList.add(formClassList.disabledButtonClass)
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formClassList.disabledButtonClass)
    buttonElement.disabled = false;
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formClassList.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  });
};

const hideActiveInputError = (form, input, secondInput) => {
  const error = Array.from(form.querySelectorAll('.popup__input-error'));
  if (input.classList.contains(formClassList.inputErrorClass) || secondInput.classList.contains(formClassList.inputErrorClass)) {
      input.classList.remove(formClassList.inputErrorClass);
      secondInput.classList.remove(formClassList.inputErrorClass);
        error.forEach((errorMessage) => {
        errorMessage.classList.remove(formClassList.errorClass);
        errorMessage.textContent = '';
    })};
};

enableValidation(formClassList);



