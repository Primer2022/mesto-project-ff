const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupImage = imagePopup.querySelector('.popup__image');

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export const placesList = document.querySelector('.places__list');

export function createCard(cardData, popup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);
  cardElement.querySelector('.card__image').addEventListener('click', (evt) => openCardPopup(evt, popup));
  cardElement.querySelector('.card__like-button').addEventListener('click', like);

  return cardElement;
}

export function removeCard(evt) {
  evt.target.closest('.card').remove();
}

function like(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function openCardPopup(evt, popup) {
  imagePopupCaption.textContent = evt.target.parentElement.querySelector('.card__title').textContent;
  imagePopupImage.src = evt.target.src;
  popup.openPopup(popupImage);
}