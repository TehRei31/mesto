const formConfig = {
    formSelector: '.popup__form',
    inputContainerSelector: '.popup__input-container',
    inputSelector: '.popup__input', 
    errorSelector: '.popup__input-error',
    submitSelector: '.popup__submit' , 
    inputErrorClass: 'popup__input_error' , 
    disabledSubmitClass: 'popup__submit_disabled',
};

function resetFormErrors({form, inputContainerSelector, inputSelector, errorSelector, inputErrorClass}) {
    const inputs = getFormInputs({form, inputContainerSelector, inputSelector, errorSelector});
    inputs.forEach((inputItem) => {
        hideInputError({
            input: inputItem.input,
            error: inputItem.error,
            inputErrorClass
        })
    });
}

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

function disableSubmit(submit, disabledSubmitClass) {
    submit.classList.add(disabledSubmitClass);
    submit.disabled = true;
}

function validateForm({
    inputContainers,
    submit,
    disabledSubmitClass,
}) {
    if (hasInvalidInput(inputContainers)) {
        disableSubmit(submit, disabledSubmitClass);
    } else {
        submit.classList.remove(disabledSubmitClass);
        submit.disabled = false;
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

function getFormInputs({form, inputContainerSelector, inputSelector, errorSelector}) {
    return Array.from(form.querySelectorAll(inputContainerSelector))
            .map((inputContainer) => ({
                input: inputContainer.querySelector(inputSelector),
                error: inputContainer.querySelector(errorSelector),
            }));
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
    const forms = Array.from(document.querySelectorAll(formSelector));

    forms.forEach((form) => {
        const submit = form.querySelector(submitSelector);

        const inputContainers = getFormInputs({form, inputContainerSelector, inputSelector, errorSelector});

        setInputListeners({
            inputContainers,
            submit,
            inputErrorClass,
            disabledSubmitClass,
        });
    });
}

enableValidation(formConfig);
