import * as api from "./api.js";

export const placesList = document.querySelector('.places__list');

export function createCard(profile, cardData, popup, openCardPopupFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  if (cardData.owner._id != profile._id) {
    deleteButton.remove();
  } else {
    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => api.removeCard(evt, cardData));
  }

  for (const like of cardData.likes) {
    if(like._id == profile._id) {
      likeButton.classList.add('card__like-button_is-active');
    }
  }

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').addEventListener('click', (evt) => openCardPopupFunction(evt, popup, cardData.name));
  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => like(evt, cardData, likeCount));
  likeCount.textContent = cardData.likes.length;

  return cardElement;
}

async function like(evt, cardData, likeCount) {
  const likeElement = evt.target;
  let updatedCard;

  if (likeElement.classList.contains('card__like-button_is-active')) {
    api.unLike(evt, cardData, likeCount);
  } else {
    api.like(evt, cardData, likeCount);
  }

  likeCount.textContent = updatedCard.likes.length;

  likeElement.classList.toggle('card__like-button_is-active');
}