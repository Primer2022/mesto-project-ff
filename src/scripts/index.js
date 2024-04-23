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

cards.initialCards.forEach((cardData) => {
    addCardToList(cards.createCard(cardData, modal));
})

addButton.addEventListener('click', () => modal.openPopup(document.querySelector('.popup_type_new-card')));
editButton.addEventListener('click', () => {
    updateProfileFormValue();
    modal.openPopup(document.querySelector('.popup_type_edit'))
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
        modal
        ));
    evt.target.reset();
    modal.closePopup(modal.getOpenedPopup());
}

function addCardToList(card) {
    cards.placesList.prepend(card);
  }

updateProfileFormValue();

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);