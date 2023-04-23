const editProfileBtn = document.querySelector('.profile__edit-btn');

const profileName = document.querySelector('.profile__name');

const profileDescription = document.querySelector('.profile__description');

const addCardBtn = document.querySelector('.profile__add-btn');

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

const zoomImagePopup = document.querySelector('#image-popup')

const closeZoomImagePopupBtn = zoomImagePopup.querySelector('.popup__close-btn');

const zoomImagePopupPic = document.querySelector('.popup__figure-pic');

const zoomImagePopupCaption = document.querySelector('.popup__figure-caption');

const cardTemplate = document.querySelector('#element-template');

const cardContainer = document.querySelector('.element');

const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
};

const openEditProfilePopup = () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(editProfilePopup);
};

const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
};

const closeZoomImagePopup = () => {
  closePopup(zoomImagePopup);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(editProfilePopup);
};

const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector('.element__card').cloneNode(true);

  const cardImage = cardElement.querySelector('.element__card-image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardDeleteBtn = cardElement.querySelector('.element__delete-btn');
  const cardLikeBtn = cardElement.querySelector('.element__like-btn');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const handleCardDelete = () => {
    cardElement.remove();
  };

  const handleLike  = () => {
    cardLikeBtn.classList.toggle('element__like-btn_active');
  };

  const openZoomImagePopup = () => {
    zoomImagePopupPic.src = cardData.link;
    zoomImagePopupPic.alt = cardData.name
    zoomImagePopupCaption.textContent = cardData.name;
    openPopup(zoomImagePopup);
  };

  cardDeleteBtn.addEventListener('click', handleCardDelete);
  cardLikeBtn.addEventListener('click', handleLike);
  cardImage.addEventListener('click', openZoomImagePopup);

  return cardElement;
};

initialCards.forEach((card) => {
  const element = createCardElement(card);

  cardContainer.append(element);
});

const handleAddNewCard = (evt) => {
  evt.preventDefault();
  cardContainer.prepend(createCardElement({name:inputTitle.value, link:inputUrl.value}));
  evt.target.reset();
  closePopup(addCardPopup);
};

editProfileBtn.addEventListener('click', openEditProfilePopup);
closeProfileEditBtn.addEventListener('click', () => closePopup(editProfilePopup));
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardBtn.addEventListener('click', () => openPopup(addCardPopup));
closeCardAddBtn.addEventListener('click', () => closePopup(addCardPopup));
addCardForm.addEventListener('submit', handleAddNewCard);
closeZoomImagePopupBtn.addEventListener('click', closeZoomImagePopup);
