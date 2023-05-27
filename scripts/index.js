import { config, initialCards } from "./objects.js";

import { Card } from "./card.js";

import { FormValidator } from "./FormValidator.js";

const editProfileBtn = document.querySelector('.profile__edit-btn');

const profileName = document.querySelector('.profile__name');

const profileDescription = document.querySelector('.profile__description');

const addCardBtn = document.querySelector('.profile__add-btn');

const popupElements = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('#edit-popup');

const inputName = editProfilePopup.querySelector('.popup__input_data_name');

const inputDescription = editProfilePopup.querySelector('.popup__input_data_description');

const editProfileForm = editProfilePopup.querySelector('.popup__form');

const addCardPopup = document.querySelector('#add-popup');

const inputTitle = addCardPopup.querySelector('.popup__input_data_title');

const inputUrl = addCardPopup.querySelector('.popup__input_data_url');

const addCardForm = addCardPopup.querySelector('.popup__form');

const zoomImagePopup = document.querySelector('#image-popup')

const zoomImagePopupPic = document.querySelector('.popup__figure-pic');

const zoomImagePopupCaption = document.querySelector('.popup__figure-caption');

const closeButtons = document.querySelectorAll('.popup__close-btn');

const cardContainer = document.querySelector('.element');

const editProfileValidator = new FormValidator(config, editProfileForm);

const addCardValidator = new FormValidator(config, addCardForm);

const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const openEditProfilePopup = () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(editProfilePopup);
  editProfileValidator.resetValidation();
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

export const handleCardClick = (title, image) => {
  zoomImagePopupCaption.textContent = title;
  zoomImagePopupPic.src = image;
  zoomImagePopupPic.alt = title;
  openPopup(zoomImagePopup);
}

popupElements.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement);
    }
  });
});

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(editProfilePopup);
}

const createCard = (item) => {
  const card = new Card(item, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const renderInitialCards = () => {
  initialCards.forEach((item) => {
    cardContainer.append(createCard(item));
  });
};

const handleAddNewCard = (evt) => {
  evt.preventDefault();
  cardContainer.prepend(createCard({name:inputTitle.value, link:inputUrl.value}));
  evt.target.reset();
  closePopup(addCardPopup);
};

renderInitialCards();

editProfileValidator.enableValidation();

addCardValidator.enableValidation();


editProfileBtn.addEventListener('click', openEditProfilePopup);

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

addCardBtn.addEventListener('click', () => {openPopup(addCardPopup); addCardValidator.resetValidation()});

addCardForm.addEventListener('submit', handleAddNewCard);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
