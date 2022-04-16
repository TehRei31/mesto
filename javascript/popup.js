const closeButtom = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const popupName = document.querySelector('.popup__name');
const popupAbout = document.querySelector('.popup__about');
const popupForm = document.querySelector('.popup__form');

popupName.value = window.profileName.innerHTML;
popupAbout.value = window.profileAbout.innerHTML;

closeButtom.addEventListener('click', () => {
    popup.classList.remove('popup_opened');
});

popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    window.profileName.innerHTML = event.target.name.value;
    window.profileAbout.innerHTML = event.target.about.value;
    popup.classList.remove('popup_opened');
});

window.popup = popup;
