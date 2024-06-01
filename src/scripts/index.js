import "../pages/index.css";
import * as cards from "./cards.js";
import * as modal from "./modal.js";
import * as validation from "./validation.js"
import * as api from "./api.js";

const profileImage = document.querySelector('.profile__image');
const addButton = document.querySelector(".profile__add-button");
const addCardForm = document.forms["new-place"];
const cardText = addCardForm.elements["place-name"];
const cardUrl = addCardForm.elements["link"];
const editButton = document.querySelector(".profile__edit-button");
const editProfileForm = document.forms["edit-profile"];
const profileName = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const imagePopup = document.querySelector(".popup_type_image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfilePopup = document.querySelector(".popup_type_edit");
const avatarButton = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const profile = await api.getProfile();

updateProfileElements(profile);

addButton.addEventListener("click", () => modal.openPopup(newCardPopup));
editButton.addEventListener("click", () => {
  updateProfileFormValue();
  modal.openPopup(editProfilePopup);
});
avatarButton.addEventListener("click", () => modal.openPopup(avatarPopup));

addCards(await api.getInitialCards());

function addCards(cardList) {
  for (let i = 0; i < cardList.length; i++) {
    const cardData = cardList[i];
    addCardToList(cards.createCard(profile, cardData, modal, openCardPopup));
  }
}

function addCardToList(card) {
  cards.placesList.prepend(card);
}

function updateProfileFormValue() {
  editProfileForm.elements["name"].value = profileName.textContent;
  editProfileForm.elements["description"].value = profileDesc.textContent;
}

function updateProfileElements(profile) {
  if(profile.name != undefined) {
    profileName.textContent = profile.name;
  }
  if(profile.about != undefined) {
    profileDesc.textContent = profile.about;
  }
  if(profile.avatar != undefined) {
    profileImage.style.backgroundImage = "url('" + profile.avatar + "')";
  }
}

async function updateProfile(updatedProfile) {
  for (const key of Object.keys(updatedProfile)) {
    profile[key] = updatedProfile[key];
  }

  api.saveAvatar(updatedProfile);
  api.saveProfile(updatedProfile);

  updateProfileElements(updatedProfile);
}

const handleAddCardFormSubmit = async () => {
  const text = cardText.value;
  const url = cardUrl.value;
  const cardData = await api.saveCard(text, url);

  addCardToList(
    cards.createCard(
      profile,
      cardData,
      modal,
      openCardPopup
    )
  );
}

function openCardPopup(evt, popup, imageAlt) {
  imagePopupCaption.textContent = evt.target.closest('.card').querySelector(".card__title")
    .textContent;
  imagePopupImage.src = evt.target.src;
  imagePopupImage.alt = imageAlt;
  popup.openPopup(imagePopup);
}

validation.enableValidation(modal, handleAddCardFormSubmit, updateProfile);
