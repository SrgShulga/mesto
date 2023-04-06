const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const closePopupBtn = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_data_name');
const inputDescription = document.querySelector('.popup__input_data_description');
const popupEditProfile = document.querySelector('.popup__submit-btn');

function togglePopup () {
  popup.classList.toggle('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

openPopupBtn.addEventListener('click',togglePopup);
closePopupBtn.addEventListener('click', togglePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  togglePopup();
}
popupEditProfile.addEventListener('click', handleFormSubmit);
