export const toggleButtonState = (config, inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.buttonInactive);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(config.buttonInactive);
        buttonElement.removeAttribute('disabled');
    }
}

export const showInputError = (config, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#popup__input-${inputElement.name}-error`);
    inputElement.classList.add(config.inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.inputErrorSpanActive);
};

export const hideInputError = (config, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#popup__input-${inputElement.name}-error`);
    inputElement.classList.remove(config.inputError);

    if(errorElement == null) {
        return;
    }

    errorElement.classList.remove(config.inputErrorSpanActive);
    errorElement.textContent = '';
    inputElement.setCustomValidity('');
};

export const hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

export const checkFormValidation = (config, formElement) => {
    return hasInvalidInput(Array.from(formElement.querySelectorAll(config.input)));
}

export const checkInputValidity = (config, formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(config, formElement, inputElement);
    }
}

export const setEventListeners = (config, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.input));
    const buttonElement = formElement.querySelector(config.button);
    toggleButtonState(config, inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(config, formElement, inputElement);
            toggleButtonState(config, inputList, buttonElement);
        });
    });
};

export const enableValidation = (config) => { 
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => { 
      formElement.addEventListener('submit', function(evt) { 
        evt.preventDefault() 
      })
      setEventListeners(config, formElement); 
   })
 }

export const clearValidation = (config, formElement) => {
    const buttonElement = formElement.querySelector(config.button);

    Array.from(formElement.elements).forEach(element => {
        hideInputError(config, formElement, element);
    })

    toggleButtonState(config, formElement.querySelectorAll(config.input), buttonElement);
}