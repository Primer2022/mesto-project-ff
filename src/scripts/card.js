import * as api from "./api.js";
export const placesList = document.querySelector('.places__list');

export function createCard(profile, cardData, popup, openCardPopupFunction, likeFunction, removeCardFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  if (cardData.owner._id != profile._id) {
    deleteButton.remove();
  } else {
    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
      removeCardFunction(evt, cardData);
      evt.target.closest('.card').remove();
    });
  }

  for (const like of cardData.likes) {
    if (like._id == profile._id) {
      likeButton.classList.add('card__like-button_is-active');
    }
  }

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').addEventListener('click', (evt) => openCardPopupFunction(evt, popup, cardData.name));
  cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => likeFunction(evt, cardData, likeCount));
  likeCount.textContent = cardData.likes.length;

  return cardElement;
}

export async function like(evt, cardData, likeCount) {
  const likeElement = evt.target;
  let updatedCard;

  if (likeElement.classList.contains('card__like-button_is-active')) {
    updatedCard = await api.unLike(cardData).catch(err => console.log(err));
  } else {
    updatedCard = await api.like(cardData).catch(err => console.log(err));
  }

  likeCount.textContent = updatedCard.likes.length;
  likeElement.classList.toggle('card__like-button_is-active');
}