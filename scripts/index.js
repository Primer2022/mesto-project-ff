const placesList = document.querySelector('.places__list');

initialCards.forEach((card) => {
    createCard(card.name, card.link);
})

function createCard(cardTitle, cardImageSrc) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').setAttribute('src', cardImageSrc);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        cardElement.remove();
    });

    placesList.append(cardElement);
}