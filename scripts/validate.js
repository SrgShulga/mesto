const formClassList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  disabledButtonClass: '.popup__submit-btn_disabled',
  inputErrorClass: '.popup__input_data_error',
  errorClass: '.popup__input-error'
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_data_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_data_error');
  errorElement.classList.remove('popup__input-error_visible');
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
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-btn');
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
    buttonElement.classList.add('popup__submit-btn_disabled')
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__submit-btn_disabled')
    buttonElement.disabled = false;
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement);
  });
};

const hideActiveInputError = (form, input, secondInput) => {
  const error = Array.from(form.querySelectorAll('.popup__input-error'));
  if (input.classList.contains('popup__input_data_error') || secondInput.classList.contains('popup__input_data_error')) {
      input.classList.remove('popup__input_data_error');
      secondInput.classList.remove('popup__input_data_error');
        error.forEach((errorMessage) => {
        errorMessage.classList.remove('popup__input-error_visible');
        errorMessage.textContent = '';
    })};
};

enableValidation(formClassList);



