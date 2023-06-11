export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  disabledButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_data_error',
  errorClass: 'popup__input-error_visible',
};

export const editProfileBtn = document.querySelector('.profile__edit-btn');

export const addCardBtn = document.querySelector('.profile__add-btn');

export const editProfilePopup = document.querySelector('#edit-popup');

export const inputName = editProfilePopup.querySelector('.popup__input_data_name');

export const inputDescription = editProfilePopup.querySelector('.popup__input_data_description');

export const editProfileForm = editProfilePopup.querySelector('.popup__form');

export const addCardPopup = document.querySelector('#add-popup');

export const addCardForm = addCardPopup.querySelector('.popup__form');
