export const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button-inactive');
    } else {
        buttonElement.classList.remove('popup__button-inactive');
    }
}

export const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#popup__input-${inputElement.name}-error`);
    inputElement.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error-span_active');
};

export const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#popup__input-${inputElement.name}-error`);
    inputElement.classList.remove('popup__input-error');
    errorElement.classList.remove('popup__input-error-span_active');
    errorElement.textContent = '';
    inputElement.setCustomValidity('');
};

export const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

export const checkFormValidation = (formElement) => {
    return hasInvalidInput(Array.from(formElement.querySelectorAll('.popup__input')));
}

export const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

export const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

export const enableValidation = (modal, handleAddCardFormSubmit, updateProfile) => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', async function (evt) {
            evt.preventDefault();

            if (checkFormValidation(evt.target.closest('.popup__form'))) return;

            formElement.querySelector('.popup__button').textContent = "Сохранение...";

            switch (formElement.getAttribute('name')) {
                case ("edit-profile"): {
                    await updateProfile({
                        name: formElement.elements["name"].value,
                        about: formElement.elements["description"].value,
                      });
                    break;
                }
                case ("new-place"): {
                    await handleAddCardFormSubmit();
                    break;
                }
                case ("avatar"): {
                    await updateProfile({
                        avatar: formElement.elements["link"].value
                    })
                    break;
                }
            }

            evt.target.reset();
            modal.closePopup(modal.getOpenedPopup());
            formElement.querySelector('.popup__button').textContent = "Сохранить";
        });

        setEventListeners(formElement);
    });
};