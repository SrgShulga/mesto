import { config, initialCards } from "./objects.js";

import { Card } from "./Card.js";

import { FormValidator } from "./FormValidator.js";

const editProfileBtn = document.querySelector('.profile__edit-btn');

const profileName = document.querySelector('.profile__name');

const profileDescription = document.querySelector('.profile__description');

const addCardBtn = document.querySelector('.profile__add-btn');

const popupElements = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('#edit-popup');

const closeProfileEditBtn = editProfilePopup.querySelector('.popup__close-btn');

const inputName = editProfilePopup.querySelector('.popup__input_data_name');

const inputDescription = editProfilePopup.querySelector('.popup__input_data_description');

const editProfileForm = editProfilePopup.querySelector('.popup__form');

const addCardPopup = document.querySelector('#add-popup');

const closeCardAddBtn = addCardPopup.querySelector('.popup__close-btn');

const inputTitle = addCardPopup.querySelector('.popup__input_data_title');

const inputUrl = addCardPopup.querySelector('.popup__input_data_url');

const addCardForm = addCardPopup.querySelector('.popup__form');

export const zoomImagePopup = document.querySelector('#image-popup')

export const zoomImagePopupPic = document.querySelector('.popup__figure-pic');

export const zoomImagePopupCaption = document.querySelector('.popup__figure-caption');

const closeZoomImagePopupBtn = zoomImagePopup.querySelector('.popup__close-btn');

export const cardTemplate = document.querySelector('#element-template');

const cardContainer = document.querySelector('.element');


export const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const openEditProfilePopup = () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(editProfilePopup);
  new FormValidator(config, editProfileForm).hideActiveInputError(inputName, inputDescription);
};

const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};


const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

popupElements.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement);
    }
  });
});

const closeZoomImagePopup = () => {
  closePopup(zoomImagePopup);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(editProfilePopup);
};

const handleAddNewCard = (evt) => {
  evt.preventDefault();
  cardContainer.prepend(new Card({name:inputTitle.value, link:inputUrl.value}, '#element-template').generateCard());
  evt.target.reset();
  closePopup(addCardPopup);
  new FormValidator(config, addCardForm).enableValidation();
};

document.querySelectorAll(config.formSelector).forEach(formElement => {
  new FormValidator(config, formElement).enableValidation();
});

initialCards.forEach((item) => {
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard();

  cardContainer.append(cardElement);
});

editProfileBtn.addEventListener('click', openEditProfilePopup);
closeProfileEditBtn.addEventListener('click', () => closePopup(editProfilePopup));
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardBtn.addEventListener('click', () => {
  openPopup(addCardPopup);
  new FormValidator(config, addCardForm).hideActiveInputError(inputTitle, inputUrl);
});
closeCardAddBtn.addEventListener('click', () => closePopup(addCardPopup));
addCardForm.addEventListener('submit', handleAddNewCard);
closeZoomImagePopupBtn.addEventListener('click', closeZoomImagePopup);
