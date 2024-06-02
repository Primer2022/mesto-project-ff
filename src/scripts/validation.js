export const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button-inactive');
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove('popup__button-inactive');
        buttonElement.removeAttribute('disabled');
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

    if(errorElement == null) {
        return;
    }

    errorElement.classList.remove('popup__input-error-span_active');
    errorElement.textContent = '';
    inputElement.setCustomValidity('');
};

export const hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((inputElement) => {
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

export const enableValidation = (config) => { 
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formElement) => { 
      formElement.addEventListener('submit', function(evt) { 
        evt.preventDefault() 
      })
      setEventListeners(formElement, config); 
   })
 }

export const clearValidation = (formElement) => {
    const buttonElement = formElement.querySelector('.popup__button');

    Array.from(formElement.elements).forEach(element => {
        hideInputError(formElement, element);
    })

    toggleButtonState(formElement.querySelectorAll(".popup__input"), buttonElement);
}