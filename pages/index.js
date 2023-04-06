const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-btn');
const closePopupBtn = document.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = document.querySelector('.popup__input_data_name');
const inputJob = document.querySelector('.popup__input_data_job');
const popupEditProfile = document.querySelector('.popup__submit-btn');

function togglePopup () {
  popup.classList.toggle('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

openPopupBtn.addEventListener('click',togglePopup);
closePopupBtn.addEventListener('click', togglePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  togglePopup();
}
popupEditProfile.addEventListener('click', handleFormSubmit);
