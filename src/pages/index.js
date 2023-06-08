import {config, initialCards} from '../components/utils/constants.js';

import { Card } from '../components/Card.js';

import { FormValidator } from '../components/FormValidator.js';

import { Section } from '../components/Section.js';

import { PopupWithImage } from '../components/PopupWithImage.js'

import { PopupWithForm } from '../components/PopupWithForm.js'

import { UserInfo } from '../components/UserInfo.js';

import {
  editProfileForm, addCardForm,
  addCardBtn, editProfileBtn,
  inputName, inputDescription
} from '../components/utils/constants.js'

import './index.css';

const editProfileValidator = new FormValidator(config, editProfileForm);

const addCardValidator = new FormValidator(config, addCardForm);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

const popupEditProfile = new PopupWithForm('#edit-popup', {
  formSubmitCallback: (profileData) => {
    userInfo.setUserInfo({
      name: profileData.userName,
      description: profileData.userDescription
    })
    popupEditProfile.close();
  }
});

const popupAddCard = new PopupWithForm('#add-popup', {
  formSubmitCallback: (formValues) => {
    renderInitialCards.addItem(createCard({
      name: formValues.placeTitle,
      link: formValues.placeUrl
    }));
    popupAddCard.close()
  }
});

const popupZoomImage = new PopupWithImage('#image-popup');

popupEditProfile.setEventListeners();

popupAddCard.setEventListeners();

popupZoomImage.setEventListeners();


const createCard = (item) => {
  const card = new Card(item, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const renderInitialCards = new Section({
  items: initialCards,
  renderer: (cardData) => {
    renderInitialCards.addItem(createCard(cardData));
  }
}, '.element');

export const handleCardClick = (title, image) => {
  popupZoomImage.open(title, image)
};

renderInitialCards.renderItems();

editProfileValidator.enableValidation();

addCardValidator.enableValidation();

editProfileBtn.addEventListener('click', () => {
  popupEditProfile.open()
  const actualUserInfo = userInfo.getUserInfo();
  inputName.setAttribute('value', actualUserInfo.name);
  inputDescription.setAttribute('value', actualUserInfo.description);
  editProfileValidator.resetValidation();
});

addCardBtn.addEventListener('click', () => {
  popupAddCard.open();

  addCardValidator.resetValidation();
});
