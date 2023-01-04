import dataPetsArr from "../dataPets.json";


function createPetsPopup (data) {

  return `	<div class="popup__wrapper">
              <div class="popup__content">
              <button data-close type="button" class="popup__close">X</button>
              <div class="popup__img-warp">
                <img src="${data.img}" alt="${data.name}" class="popup__img">
              </div>
              <div class="popup__text-wrap">
                <span class="popup__nickname">${data.name}</span>
                <span class="popup__breed">${data.breed}</span>
                <p class="popup__description">${data.description}</p>
                <ul class="popup__parameters-list">
                  <li class="popup__parameters-item popup__parameters-item_age"><b>Age:</b>${data.age}</li>
                  <li class="popup__parameters-item popup__parameters-item_inoculations"><b>Inoculations:</b>${data.inoculations}</li>
                  <li class="popup__parameters-item popup__parameters-item_diseases"><b>Diseases:</b>${data.diseases}</li>
                  <li class="popup__parameters-item popup__parameters-item_parasites"><b>Parasites:</b>${data.parasites}</li>
                </ul>
              </div>
            </div>
          </div>
         `
}

function renderPetsPopup (event) {
  const correctPetData = choiceCorrectPet(event);
  const correctPopupHTML = createPetsPopup(correctPetData);
  const popupContainer = document.querySelector("#friend-card-popup");

  popupContainer.innerHTML = correctPopupHTML;
}

function choiceCorrectPet (event) {
  const petsId = event.currentTarget.getAttribute("data-pets-id");
  if (!petsId) throw new Error("element has not [data-pets-id]");

  const petData = dataPetsArr.find(item => item.id === petsId);
  if (!petData) throw new Error(`pet with id:${IdPets} not found`);

  return petData;
}

export function openCorrectPopupsInit () {
  const allPopupElements = document.querySelectorAll(".popup-item");
  const allPopupElementsArray = Array.from(allPopupElements);
  const petsPopupElements = allPopupElementsArray.filter(item => item.getAttribute("data-popup") === "#friend-card-popup");

  petsPopupElements
    ? petsPopupElements.forEach(item => item.addEventListener("click", renderPetsPopup))
    : console.log(`items with data-popup="#friend-card-popup" not found`);
}