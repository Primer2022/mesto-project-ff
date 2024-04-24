import '../pages/index.css';
import * as cards from './cards.js';
import * as modal from './modal.js';

const addButton = document.querySelector('.profile__add-button');
const addCardForm = document.forms['new-place'];
const cardText = addCardForm.elements['place-name'];
const cardUrl = addCardForm.elements['link'];
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editProfilePopup = document.querySelector('.popup_type_edit');

cards.initialCards.forEach((cardData) => {
    addCardToList(cards.createCard(cardData, modal, openCardPopup));
})

addButton.addEventListener('click', () => modal.openPopup(newCardPopup));
editButton.addEventListener('click', () => {
    updateProfileFormValue();
    modal.openPopup(editProfilePopup)
});

function updateProfileFormValue() {
    editProfileForm.elements['name'].value = profileName.textContent;
    editProfileForm.elements['description'].value = profileDesc.textContent;
}

function updateProfile(name, desc) {
    profileName.textContent = name;
    profileDesc.textContent = desc;
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    updateProfile(editProfileForm.elements['name'].value, editProfileForm.elements['description'].value);
    modal.closePopup(modal.getOpenedPopup());
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    addCardToList(cards.createCard(
        {
            name: cardText.value,
            link: cardUrl.value,
        },
        modal,
        openCardPopup
        ));
    evt.target.reset();
    modal.closePopup(modal.getOpenedPopup());
}

function addCardToList(card) {
    cards.placesList.prepend(card);
}

function openCardPopup(evt, popup, imageAlt) {
    imagePopupCaption.textContent = evt.target.parentElement.querySelector('.card__title').textContent;
    imagePopupImage.src = evt.target.src;
    imagePopupImage.alt = imageAlt;
    popup.openPopup(popupImage);
}

updateProfileFormValue();

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);