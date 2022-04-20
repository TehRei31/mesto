const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const closeButtom = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupName = document.querySelector('.popup__name');
const popupAbout = document.querySelector('.popup__about');
const popupForm = document.querySelector('.popup__form');

popupName.value = profileName.innerHTML;
popupAbout.value = profileAbout.innerHTML;

editButton.addEventListener('click', () => {
    popup.classList.add('popup_opened');
});

closeButtom.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.innerHTML = event.target.name.value;
    profileAbout.innerHTML = event.target.about.value;
    popup.classList.remove('popup_opened');
});
