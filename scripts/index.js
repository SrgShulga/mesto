const initialCards = [
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

const editProfileBtn = document.querySelector('.profile__edit-btn');

const addCardBtn = document.querySelector('.profile__add-btn');

const editPopup = document.querySelector('#edit__popup');

const addPopup = document.querySelector('#add__popup');

const closeProfileEditBtn = editPopup.querySelector('.popup__close-btn');

const closeCardAddBtn = addPopup.querySelector('.popup__close-btn');

const profileName = document.querySelector('.profile__name');

const profileDescription = document.querySelector('.profile__description');

const inputName = editPopup.querySelector('.popup__input_data_name');

const inputDescription = editPopup.querySelector('.popup__input_data_description');

const inputTitle = addPopup.querySelector('.popup__input_data_title');

const inputUrl = addPopup.querySelector('.popup__input_data_url');

const editProfileForm = editPopup.querySelector('.popup__form');

const addCardForm = addPopup.querySelector('.popup__form');

const cardTemplate = document.querySelector('#element-template');

const cardContainer = document.querySelector('.elements');

const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
};

const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(editPopup);
};

const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector('.element__card').cloneNode(true);

  const cardImage = cardElement.querySelector('.element__card-image');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardDeleteButton = cardElement.querySelector('.element__delete-btn');
  const cardLikeButton = cardElement.querySelector('.element__like-btn');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike  = (evt) => {
    cardLikeButton.classList.toggle('element__like-btn_active');
  };

  cardDeleteButton.addEventListener('click', handleDelete);
  cardLikeButton.addEventListener('click', handleLike);

  return cardElement;
};

initialCards.forEach((card) => {
  const element = createCardElement(card);

  cardContainer.prepend(element);
});

const addNewCard = (evt) => {
      evt.preventDefault();
      cardContainer.prepend(createCardElement(inputTitle.value, inputUrl.value));
      evt.target.reset();
      closePopup(addPopup);
  };

editProfileBtn.addEventListener('click',() => openPopup(editPopup));
closeProfileEditBtn.addEventListener('click', () => closePopup(editPopup));
addCardBtn.addEventListener('click', () => openPopup(addPopup));
closeCardAddBtn.addEventListener('click', () => closePopup(addPopup));
editProfileForm.addEventListener('submit', handleFormSubmit);
addCardForm.addEventListener('submit', addNewCard);


