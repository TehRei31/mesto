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


function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
function overlayPopupListener(event) {
    const {target} = event;

    if (target.classList.contains('popup')) {
        closePopup(target);
    }
}


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

popupEditProfile.addEventListener('click', overlayPopupListener);

editProfileButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
});

closeButtomEditProdile.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

popupFormEditProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.innerHTML = event.target.name.value;
    profileAbout.innerHTML = event.target.about.value;
    closePopup(popupEditProfile);
});


// ADD POPUP
const addElementButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('.popup_type_add-element');
const closeButtonAddElement = document.querySelector('.popup__close-button_type_add-element');
const popupFormAddElement = document.querySelector('.popup__form_type_add-element')

popupAddElement.addEventListener('click', overlayPopupListener);

addElementButton.addEventListener('click', () => {
    openPopup(popupAddElement);
});

closeButtonAddElement.addEventListener('click', () => {
    closePopup(popupAddElement);
});

popupFormAddElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const element = createElement({
        name: event.target.name.value,
        link: event.target.link.value
    });
    elementsSection.appendChild(element);
    closePopup(popupAddElement);
});


// PREVIEW POPUP
const popupPreview = document.querySelector('.popup_type_photo-preview');
const closeButtonPreview = document.querySelector('.popup__close-button_type_photo-preview');
const preview = document.querySelector('.preview-container');
const previewImage = document.querySelector('.preview__image');
const previewName = document.querySelector('.preview__name');

popupPreview.addEventListener('click', overlayPopupListener);

closeButtonPreview.addEventListener('click', () => {
    closePopup(popupPreview);
});


// ELEMENTS
const elementsSection = document.querySelector('.elements');

function createElement(card) {
    const elementTemplate = document.querySelector('.element__template');
    const elementTemplateClone = elementTemplate.content.cloneNode(true);
    const elementNode = elementTemplateClone.querySelector('.element');

    const elementImage = elementTemplateClone.querySelector('.element__image');
    elementImage.src = card.link;
    elementImage.alt = card.name;
    elementImage.addEventListener('click', () => {
        openPopup(popupPreview);

        previewImage.src = card.link;
        previewImage.alt = card.name;

        previewName.innerText = card.name;
    });

    const elementTitle = elementTemplateClone.querySelector('.element__title');
    elementTitle.innerHTML = card.name;

    const elementLikeButton = elementTemplateClone.querySelector('.element__like-button');
    elementLikeButton.addEventListener('click', (event) => {
        const {currentTarget} = event;
        currentTarget.classList.toggle('element__like-button_active');
    });

    const elementTrashImage = elementTemplateClone.querySelector('.element__trash-image');
    elementTrashImage.src = './images/trash.svg';
    elementTrashImage.alt = 'удалить';
    elementTrashImage.addEventListener('click', () => {
        elementNode.remove();
    });

    return elementTemplateClone;
}

initialCards.forEach((card) => {
    const element = createElement(card);
    elementsSection.appendChild(element);
});
