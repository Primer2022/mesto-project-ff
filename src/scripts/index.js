import '../pages/index.css';
import * as cards from './cards.js';
import * as popup from './popup.js';

const addButton = document.querySelector('.profile__add-button');
const addCardForm = document.forms['new-place'];
const cardText = addCardForm.elements['place-name'];
const cardUrl = addCardForm.elements['link'];
const editButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms['edit-profile'];
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

cards.initialCards.forEach((cardData) => {
    cards.addCardToList(cards.createCard(cardData));
})

addButton.addEventListener('click', () => popup.openPopup(document.querySelector('.popup_type_new-card')));
editButton.addEventListener('click', () => popup.openPopup(document.querySelector('.popup_type_edit')));

function updateProfileFormValue() {
    editProfileForm.elements['name'].value = profileName.textContent;
    editProfileForm.elements['description'].value = profileDesc.textContent;
}

function updateProfile(name, desc) {
    profileName.textContent = name;
    profileDesc.textContent = desc;
    updateProfileFormValue();
}

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    updateProfile(editProfileForm.elements['name'].value, editProfileForm.elements['description'].value);
    popup.closePopup(popup.getOpenedPopup());
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    cards.addCardToList(cards.createCard(
        {
            name: cardText.value,
            link: cardUrl.value,
        }
        ));
    popup.closePopup(popup.getOpenedPopup());
}

updateProfileFormValue();

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);