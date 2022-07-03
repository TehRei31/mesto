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

const likedCards = {};


// EDIT POPUP
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeButtomEditProdile = document.querySelector('.popup__close-button_type_edit-prodile');
const popupNameEditPrdofile = document.querySelector('.popup__name');
const popupAboutEditProfile = document.querySelector('.popup__about');
const popupFormEditProfile = document.querySelector('.popup__form_type_edit-profile');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

popupNameEditPrdofile.value = profileName.innerHTML;
popupAboutEditProfile.value = profileAbout.innerHTML;

editProfileButton.addEventListener('click', () => {
    popupEditProfile.classList.add('popup_opening');
});

closeButtomEditProdile.addEventListener('click', () => {
    popupEditProfile.classList.add('popup_closing');
});

popupFormEditProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.innerHTML = event.target.name.value;
    profileAbout.innerHTML = event.target.about.value;
    popupEditProfile.classList.add('popup_closing');
});


// ADD POPUP
const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-element');
const closeButtonAddElement = document.querySelector('.popup__close-button_type_add-element');
const popupFormAddElement = document.querySelector('.popup__form_type_add-element')

addButton.addEventListener('click', () => {
    popupAddElement.classList.add('popup_opening');
});

closeButtonAddElement.addEventListener('click', () => {
    popupAddElement.classList.add('popup_closing');
});

popupFormAddElement.addEventListener('submit', (event) => {
    event.preventDefault();
    addElement({
        name: event.target.name.value,
        link: event.target.link.value
    });
    popupAddElement.classList.add('popup_closing');
});


// PREVIEW POPUP
const popupPreview = document.querySelector('.popup_type_photo-preview');
const closeButtonPreview = document.querySelector('.popup__close-button_type_photo-preview');
const preview = document.querySelector('.preview-container');

closeButtonPreview.addEventListener('click', () => {
    popupPreview.classList.add('popup_closing');
});


// ELEMENTS
const elementsSection = document.querySelector('.elements');

function addElement(card) {
    const elementBlock = document.createElement('div')
    elementBlock.classList.add('element');

    const elementImage = document.createElement('img');
    elementImage.classList.add('element__image');
    elementImage.src = card.link;
    elementImage.alt = card.name;
    elementImage.addEventListener('click', () => {
        popupPreview.classList.add('popup_opening');
        
        const previewImage = document.createElement('img');
        previewImage.classList.add('preview__image');
        previewImage.src = card.link;
        previewImage.alt = card.name;

        const previewName = document.createElement('p');
        previewName.classList.add('preview__name');
        previewName.innerText = card.name;

        preview.appendChild(previewImage);
        preview.appendChild(previewName);
    });

    const elementInfo = document.createElement('div');
    elementInfo.classList.add('element__info');

    const elementTitle = document.createElement('h2');
    elementTitle.classList.add('element__title');
    elementTitle.innerHTML = card.name;

    const elementLikeButton = document.createElement('button');
    elementLikeButton.classList.add('element__like-button');
    elementLikeButton.type = 'button';
    elementLikeButton.addEventListener('click', (event) => {
        const {currentTarget} = event;
        const elementLikeButtonImage = currentTarget.getElementsByClassName('element__like-image')[0];
        if (likedCards[card.name]) {
            elementLikeButtonImage.src = './images/like.svg';
            elementLikeButtonImage.alt = 'нравится';
            delete likedCards[card.name];
        } else {
            elementLikeButtonImage.src = './images/like-active.svg';
            elementLikeButtonImage.alt = 'не нравится';
            likedCards[card.name] = true;
        }
    });

    const elementLikeImage = document.createElement('img');
    elementLikeImage.classList.add('element__like-image');
    if (likedCards[card.name]) {
        elementLikeImage.src = './images/like-active.svg';
        elementLikeImage.alt = 'не нравится';
    } else {
        elementLikeImage.src = './images/like.svg';
        elementLikeImage.alt = 'нравится';
    }

    const elementTrashImage = document.createElement('img');
    elementTrashImage.classList.add('element__trash-image');
    elementTrashImage.src = './images/trash.svg';
    elementTrashImage.alt = 'удалить';
    elementTrashImage.addEventListener('click', () => {
        elementBlock.parentNode.removeChild(elementBlock);
        elementLikeButton.removeEventListener('click');
        elementTrashImage.removeEventListener('click');
    });

    elementsSection.prepend(elementBlock);
    elementBlock.appendChild(elementImage);
    elementBlock.appendChild(elementInfo);
    elementBlock.appendChild(elementTrashImage);
    elementInfo.appendChild(elementTitle);
    elementInfo.appendChild(elementLikeButton);
    elementLikeButton.appendChild(elementLikeImage);
}

document.addEventListener('DOMContentLoaded', () => {
    initialCards.reverse().forEach((card) => {
        addElement(card);
    });
});


// ANIMATION
document.addEventListener('animationstart', (event) => {
    if (event.animationName === 'fade-out') {
        event.target.classList.remove('popup_opened');
    }
});

document.addEventListener('animationend', (event) => {
    if (event.animationName === 'fade-out') {
        event.target.classList.remove('popup_closing');
        while (preview.firstChild) {
            preview.firstChild.remove();
        }
    }

    if (event.animationName === 'fade-in') {
        event.target.classList.remove('popup_opening');
        event.target.classList.add('popup_opened');
    }
});
