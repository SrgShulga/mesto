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

const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const closePopupBtn = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_data_name');
const inputDescription = document.querySelector('.popup__input_data_description');
const editProfileForm = document.querySelector('.popup__form')

const cardTemplate = document.querySelector('#elements-template');
const cardContainer = document.querySelector('.elements');

const openPopup = () => {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

const closePopup = () => {
  popup.classList.remove('popup_opened');
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

openPopupBtn.addEventListener('click',openPopup);
closePopupBtn.addEventListener('click', closePopup);
editProfileForm.addEventListener('submit', handleFormSubmit);

const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector('.elements__card').cloneNode(true);

  const cardImage = cardElement.querySelector('.elements__card-image');
  const cardTitle = cardElement.querySelector('.elements__title');
  const cardDeleteButton = cardElement.querySelector('.elements__delete-btn');
  const cardLikeButton = cardElement.querySelector('.elements__like-btn');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const handleDelete = () => {
    cardElement.remove();
  };

  const handleLike  = (evt) => {
    cardLikeButton.classList.toggle('elements__like-btn_active');
  };

  cardLikeButton.addEventListener('click', handleLike);
  cardDeleteButton.addEventListener('click', handleDelete);

  return cardElement;
};

initialCards.forEach((card) => {
  const element = createCardElement(card);

  cardContainer.prepend(element);
});

