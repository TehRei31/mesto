function formValidateListener(validateFn, submitButton) {
    return (event) => {
        const {target} = event;

        const hasErrorForm = validateFn(target);

        if (hasErrorForm) {
            submitButton.classList.add('popup__submit_disabled');
        } else {
            submitButton.classList.remove('popup__submit_disabled');
        }
    };
}

function setInputError(target, error) {
    const inputError = target.nextElementSibling;
    inputError.innerHTML = error;

    if (error) {
        target.classList.add('popup__input_error');
    } else {
        target.classList.remove('popup__input_error');
    }
}

function validateTextInput(value, min, max) {
    let error = '';

    if (value.length === 0) {
        error = 'Вы пропустили это поле.';
    } else if (value.length < min) {
        error = `Минимальное количество символов: ${min}. Длина текста сейчас: ${value.length}.`;
    } else if (value.length > max) {
        error = `Максимальное количество символов: ${max}. Длина текста сейчас: ${value.length}.`;
    }

    return error;
}


// PROFILE VALIDATION
const profileForm = document.querySelector('.popup__form_type_edit-profile');
const submitProfileForm = profileForm.querySelector('.popup__submit')

const MIN_PROFILE_NAME = 2;
const MAX_PROFILE_NAME = 40;
function validateProfileName(value) {
    return validateTextInput(value, MIN_PROFILE_NAME, MAX_PROFILE_ABOUT);
}

const MIN_PROFILE_ABOUT = 2;
const MAX_PROFILE_ABOUT = 200;
function validateProfileAbout(value) {
    return validateTextInput(value, MIN_PROFILE_ABOUT, MAX_PROFILE_ABOUT);
}

const profileFormErrors = {
    name: '',
    about: ''
};
function validateProfile(target) {    
    if (target.name === 'name') {
        const error = validateProfileName(target.value);
        profileFormErrors.name = error;
        setInputError(target, error);
        
    } else if (target.name === 'about') {
        const error = validateProfileAbout(target.value);
        profileFormErrors.about = error;
        setInputError(target, error);
    }

    return profileFormErrors.name || profileFormErrors.about;
}

profileForm.addEventListener('input', formValidateListener(validateProfile, submitProfileForm));


// ADD ELEMENT VALIDATION
const addElementForm = document.querySelector('.popup__form_type_add-element');
const submitElementForm = addElementForm.querySelector('.popup__submit')

const MIN_ELEMENT_NAME = 1;
const MAX_ELEMENT_NAME = 30;
function validateElementName(value) {
    return validateTextInput(value, MIN_ELEMENT_NAME, MAX_ELEMENT_NAME);
}

function validateElementLink(value) {
    let error = '';

    if (value.length === 0) {
        error = 'Вы пропустили это поле.';
    } else {
        try {
            new URL(value);
        } catch (e) {
            error = 'Введите адрес сайта.';
        }
    }

    return error;
}

const elementFormErros = {
    name: '',
    link: ''
};
function validateElement(target) {    
    if (target.name === 'name') {
        const error = validateElementName(target.value);
        elementFormErros.name = error;
        setInputError(target, error);
        
    } else if (target.name === 'link') {
        const error = validateElementLink(target.value);
        elementFormErros.link = error;
        setInputError(target, error);
    }

    return elementFormErros.name || elementFormErros.link;
}

addElementForm.addEventListener('input', formValidateListener(validateElement, submitElementForm));
