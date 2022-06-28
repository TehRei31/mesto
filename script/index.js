const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const popupName = document.querySelector('.popup__name');
const popupAbout = document.querySelector('.popup__about');
const popupForm = document.querySelector('.popup__form');

popupName.value = profileName.innerHTML;
popupAbout.value = profileAbout.innerHTML;

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


// ELEMENTS
const elementsSection = document.querySelector('.elements');

document.addEventListener('DOMContentLoaded', () => {
    initialCards.forEach((card) => {
        const elementBlock = document.createElement('div')
        elementBlock.classList.add('element');

        const elementImage = document.createElement('img');
        elementImage.classList.add('element__image');
        elementImage.src = card.link;
        elementImage.alt = card.name;

        const elementInfo = document.createElement('div');
        elementInfo.classList.add('element__info');

        const elementTitle = document.createElement('h2');
        elementTitle.classList.add('element__title');
        elementTitle.innerHTML = card.name;

        const elementLikeButton = document.createElement('button');
        elementLikeButton.classList.add('element__like-button');
        elementLikeButton.type = 'button';

        const elementLikeImage = document.createElement('img');
        elementLikeImage.src = './images/like.svg';
        elementLikeImage.alt = 'нравится';

        elementsSection.appendChild(elementBlock);
        elementBlock.appendChild(elementImage);
        elementBlock.appendChild(elementInfo);
        elementInfo.appendChild(elementTitle);
        elementInfo.appendChild(elementLikeButton);
        elementLikeButton.appendChild(elementLikeImage);
    });
});


// EDIT POPUP
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeButtomEditProdile = document.querySelector('.popup__close-button_type_edit-prodile');

editButton.addEventListener('click', () => {
    popupEditProfile.classList.add('popup_opened');
});

closeButtomEditProdile.addEventListener('click', () => {
    popupEditProfile.classList.remove('popup_opened');
});

popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.innerHTML = event.target.name.value;
    profileAbout.innerHTML = event.target.about.value;
    popupEditProfile.classList.remove('popup_opened');
});


// ADD POPUP
const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-element');
const closeButtonAddElement = document.querySelector('.popup__close-button_type_add-element');

addButton.addEventListener('click', () => {
    popupAddElement.classList.add('popup_opened');
});

closeButtonAddElement.addEventListener('click', () => {
    popupAddElement.classList.remove('popup_opened');
});
