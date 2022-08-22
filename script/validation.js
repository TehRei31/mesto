// ADD PLACE VALIDATION
const profileForm = document.querySelector('.popup__form_type_edit-profile');
const submitProfileForm = profileForm.querySelector('.popup__submit')
const profileFormErrors = {
    name: '',
    about: ''
};

const MIN_NAME = 2;
const MAX_NAME = 40;
function validateProfileName(value) {
    let error = '';

    if (value.length === 0) {
        error = 'Вы пропустили это поле';
    } else if (value.length < MIN_NAME) {
        error = `Минимальное количество символов: ${MIN_NAME}. Длина текста сейчас: ${value.length}`;
    } else if (value.length > MAX_NAME) {
        error = `Максимальное количество символов: ${MAX_NAME}. Длина текста сейчас: ${value.length}`;
    }

    return error;
}

const MIN_ABOUT = 2;
const MAX_ABOUT = 200;
function validateProfileAbout(value) {
    let error = '';

    if (value.length === 0) {
        error = 'Вы пропустили это поле.';
    } else if (value.length < MIN_ABOUT) {
        error = `Минимальное количество символов: ${MIN_ABOUT}. Длина текста сейчас: ${value.length}.`;
    } else if (value.length > MAX_ABOUT) {
        error = `Максимальное количество символов: ${MAX_ABOUT}. Длина текста сейчас: ${value.length}.`;
    }

    return error;
}

profileForm.addEventListener('input', (event) => {
    const {target} = event;
    const inputError = target.nextElementSibling;

    if (target.name === 'name') {
        const error = validateProfileName(target.value);
        inputError.innerHTML = error;
        profileFormErrors.name = error;
        if (error) {
            target.classList.add('popup__input_error');
        } else {
            target.classList.remove('popup__input_error');
        }
    } else if (target.name === 'about') {
        profileFormErrors.about = validateProfileAbout(target.value);
        inputError.innerHTML = profileFormErrors.about;
    }

    if (profileFormErrors.name || profileFormErrors.about) {
        submitProfileForm.classList.add('popup__submit_disabled');
    } else {
        submitProfileForm.classList.remove('popup__submit_disabled');
    }
});
