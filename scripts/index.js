const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const closePopupBtn = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_data_name');
const inputDescription = document.querySelector('.popup__input_data_description');
const editProfileForm = document.querySelector('.popup__form')

function openPopup () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
}

openPopupBtn.addEventListener('click',openPopup);
closePopupBtn.addEventListener('click', closePopup);
editProfileForm.addEventListener('submit', handleFormSubmit);
