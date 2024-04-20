export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    popup.querySelector('.popup__close').addEventListener('click', closePopupButton)
    popup.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupEsc);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.add('popup_is-animated');
    popup.querySelector('.popup__close').removeEventListener('click', closePopupButton);
    popup.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupEsc);
}

export function closePopupButton(evt) {
    closePopup(evt.target.parentElement.parentElement);
}

export function closePopupOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.currentTarget);
    }
}

export function closePopupEsc(evt) {
    console.log(evt.key);
    if (evt.key === 'Escape') {
        closePopup(getOpenedPopup());
      }
}

export function getOpenedPopup() {
    return document.querySelector('.popup_is-opened');
}

export function getPopups() {
    return document.querySelectorAll('.popup');
}

export function openCardPopup(evt) {
    const popupImage = document.querySelector('.popup_type_image');

    popupImage.querySelector('.popup__caption').textContent = evt.target.parentElement.querySelector('.card__title').textContent;
    popupImage.querySelector('.popup__image').src = evt.target.src;
    openPopup(popupImage);
}