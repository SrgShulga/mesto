import {config, editProfileForm, addCardForm, editAvatarForm, addCardBtn, editProfileBtn, editAvatarBtn, inputName, inputDescription, apiTemplate} from '../utils/constants.js';

import { Card } from '../components/Card.js';

import { Api } from '../components/Api.js';

import { Section } from '../components/Section.js';

import { FormValidator } from '../components/FormValidator.js';

import { PopupWithImage } from '../components/PopupWithImage.js'

import { PopupWithForm } from '../components/PopupWithForm.js'

import { PopupConfirm } from '../components/PopupConfirm.js';

import { UserInfo } from '../components/UserInfo.js';

import './index.css';

let userId;


const editProfileValidator = new FormValidator(config, editProfileForm);

const addCardValidator = new FormValidator(config, addCardForm);

const editAvatarValidator = new FormValidator(config, editAvatarForm);

const apiRequest = new Api(apiTemplate)

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const popupZoomImage = new PopupWithImage('#image-popup');

const popupEditProfile = new PopupWithForm('#edit-popup', {
  formSubmitCallback: (profileInfo) => {
    popupEditProfile.putSavingProcessNotice();
    apiRequest.sendUserInfo(profileInfo)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          description: res.about
        });
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`При редактировании профиля возникла ошибка, ${err}`)
      })
      .finally(() => {
        popupEditProfile.removeSavingProcessNotice();
      })
  }
});

const popupAddCard = new PopupWithForm('#add-popup', {
  formSubmitCallback: (formValues) => {
    popupAddCard.putSavingProcessNotice();
    apiRequest.createNewCard({name: formValues.placeTitle, link: formValues.placeUrl})
      .then((card) => {
    cardsSection.addItem(createCard(card));
    popupAddCard.close();
  })
  .catch((err) => {console.log(`При добавлении карточки произошла ошибка, ${err}`)})
  .finally(() => {
    popupAddCard.removeSavingProcessNotice();
      })
  }
});

const popupEditAvatar = new PopupWithForm('#avatar-popup', {
  formSubmitCallback: (profileInfo) => {
    popupEditAvatar.putSavingProcessNotice();
    apiRequest.sendAvatarData(profileInfo)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => {`При обновлении аватара профиля произошла ошибка, ${err}`})
      .finally(() => {
        popupEditAvatar.removeSavingProcessNotice();
      })
  }
});

const popupConfirmDelete = new PopupConfirm('#delete-popup', {
  confirmCallback: (cardElement, cardId) => {
    apiRequest.deleteCard(cardId)
      .then(() => {
        cardElement.deleteCard();
        popupConfirmDelete.close();
      })
      .catch((err) => {console.log(`При удалении карточки возникла ошибка, ${err}`)})
  }
});


popupEditProfile.setEventListeners();

popupAddCard.setEventListeners();

popupEditAvatar.setEventListeners();

popupZoomImage.setEventListeners();

popupConfirmDelete.setEventListeners();

editProfileValidator.enableValidation();

addCardValidator.enableValidation();

editAvatarValidator.enableValidation();


const createCard = (cardObject) => {
  const cardItem = new Card(cardObject, '#element-template', userId, {cardId: cardObject._id, ownerId: cardObject.owner._id}, {
    handleCardClick: (name, image) => {popupZoomImage.open(name, image)},
    handleCardDelete: (cardElement, cardId) => {popupConfirmDelete.open(cardElement, cardId)},
    handleCardAddLike: (cardId) => {
      apiRequest.putCardLike(cardId)
        .then((res) => {
          cardItem.renderCardLikes(res);
        })
        .catch((err) => {console.log(`При добавлении лайка карточки произошла ошибка ${err}`)})
    },
    handleCardRemoveLike: (cardId) => {
      apiRequest.deleteCardLike(cardId)
        .then((res) => {
          cardItem.renderCardLikes(res);
        })
        .catch((err) => {console.log(`При удалении лайка карточки произошла ошибка ${err}`)})
    }
  });
  return cardItem.generateCard();
};

const cardsSection = new Section({
  renderer: (cardObject) => {
    cardsSection.addItem(createCard(cardObject));
  }
}, '.element');

Promise.all([apiRequest.getUserInfo(), apiRequest.getInitialCards()])
  .then(([profileInfo, cardObject]) => {
    userId = profileInfo._id;
    userInfo.setUserInfo({name: profileInfo.name, description: profileInfo.about});
    cardsSection.renderItems(cardObject.reverse());
    userInfo.setUserAvatar(profileInfo.avatar);
  })
  .catch((err) => { console.log(`Возникла ошибка при получении данных с сервера, ${err}`)})


  editProfileBtn.addEventListener('click', function () {
  popupEditProfile.open()
  editProfileValidator.resetValidation();
  const actualUserInfo = userInfo.getUserInfo();
  inputName.value = actualUserInfo.name;
  inputDescription.value = actualUserInfo.description;
});

addCardBtn.addEventListener('click', function () {
  popupAddCard.open();

  addCardValidator.resetValidation();
});

editAvatarBtn.addEventListener('click', function () {
  popupEditAvatar.open();

  editAvatarValidator.resetValidation();
});
