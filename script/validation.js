function showInputError({
    input,
    inputErrorClass,
    error,
    errorMessage,
}) {
    input.classList.add(inputErrorClass);
    error.textContent = errorMessage;
}

function hideInputError({
    input,
    inputErrorClass,
    error,
}) {
    input.classList.remove(inputErrorClass);
    error.textContent = '';
}

function validateInput({
    input,
    error,
    inputErrorClass,
}) {
    if (!input.validity.valid) {
        showInputError({
            input,
            inputErrorClass,
            error,
            errorMessage: input.validationMessage,
        })
    } else {
        hideInputError({
            input,
            inputErrorClass,
            error,
        });
    }
}

function hasInvalidInput(inputContainers) {
    return inputContainers.some((inputContainer) => {
        return !inputContainer.input.validity.valid;
      });
}

function validateForm({
    inputContainers,
    submit,
    disabledSubmitClass,
}) {
    if (hasInvalidInput(inputContainers)) {
        submit.classList.add(disabledSubmitClass);
    } else {
        submit.classList.remove(disabledSubmitClass);
    }
}

function setInputListeners({
    inputContainers,
    submit,
    inputErrorClass,
    disabledSubmitClass,
}) {
    validateForm({
        inputContainers,
        submit,
        disabledSubmitClass,
    });
    inputContainers.forEach((inputContainer) => {
        inputContainer.input.addEventListener('input', () => {
            validateInput({
                input: inputContainer.input,
                error: inputContainer.error,
                inputErrorClass
            });
            validateForm({
                inputContainers,
                submit,
                disabledSubmitClass,
            });
        });
    });
    
}

function enableValidation({
    formSelector,
    inputContainerSelector,
    inputSelector,
    errorSelector,
    submitSelector,
    inputErrorClass,
    disabledSubmitClass,
}) {
    const form = document.querySelector(formSelector);

    const submit = form.querySelector(submitSelector);

    const inputContainers = Array.from(form.querySelectorAll(inputContainerSelector))
        .map((inputContainer) => ({
            input: inputContainer.querySelector(inputSelector),
            error: inputContainer.querySelector(errorSelector),
        }));

    setInputListeners({
        inputContainers,
        submit,
        inputErrorClass,
        disabledSubmitClass,
    })
}

enableValidation({
    formSelector: '.popup__form_type_edit-profile',
    inputContainerSelector: '.popup__input-container',
    inputSelector: '.popup__input',
    errorSelector: '.popup__input-error',
    submitSelector: '.popup__submit',
    inputErrorClass: 'popup__input_error',
    disabledSubmitClass: 'popup__submit_disabled',
});

enableValidation({
    formSelector: '.popup__form_type_add-element',
    inputContainerSelector: '.popup__input-container',
    inputSelector: '.popup__input',
    errorSelector: '.popup__input-error',
    submitSelector: '.popup__submit',
    inputErrorClass: 'popup__input_error',
    disabledSubmitClass: 'popup__submit_disabled',
});
