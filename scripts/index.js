const placesList = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
    addCardToList(createCard(cardData));
})

function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);

    return cardElement;
}

function addCardToList(card) {
    placesList.append(card);
}

function removeCard(event) {
    event.target.parentElement.remove();
}