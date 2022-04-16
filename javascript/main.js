const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

editButton.addEventListener('click', () => {
    window.popup.classList.add('popup_opened');
});

window.profileName = profileName;
window.profileAbout = profileAbout;
