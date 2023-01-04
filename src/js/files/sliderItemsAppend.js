import dataPets from "../dataPets.json";

// let shallowCopyDataPets = dataPets.slice();

function repeatSubarrays (subarray, number) {
  let arrayOfSubarrays = [];
  for (let i = 0; i < number; i++) {
    let subarrayShallowCopy = subarray.slice();
    arrayOfSubarrays.push(subarrayShallowCopy);
  }

  return arrayOfSubarrays;
}

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1)); 

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};

function createCard (cardsData) {
  return `
          <div data-popup="#friend-card-popup" data-pets-id="${cardsData.id}" class="friends-slider__item friend-card popup-item swiper-slide">
            <img src="${cardsData.img}" alt="${cardsData.name}}" class="friend-card__img">
            <span class="friend-card__title">${cardsData.name}</span>
            <button class="friend-card__learn-btn friend-card__learn-btn_woody">Learn more</button>
          </div>
         `
}

function createSlides (slidesDataArr) {
  let resultHTML = slidesDataArr.map(dataSlide => createCard(dataSlide)).join('\n');

  return resultHTML;
}

export function appendSlidesInSlider () {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  if (!swiperWrapper) throw new Error(".swiper-wrapper not found");

  if (swiperWrapper.closest(".swiper-pets-page")) {
    let arrayRepeatDataPets = repeatSubarrays(dataPets, 6);
    let ShuffledPagesDataPetsArr = arrayRepeatDataPets.map(el => shuffleArray(el)).flat();
    swiperWrapper.innerHTML = createSlides(ShuffledPagesDataPetsArr);

  } else if (swiperWrapper.closest(".swiper-main-page")) {
    let shuffledDataPetsCopy = shuffleArray(dataPets.slice());
    let validDataPetsArr = shuffledDataPetsCopy.concat(shuffledDataPetsCopy.slice(2, 6));
    swiperWrapper.innerHTML = createSlides(validDataPetsArr);

  } else {
    throw new Error("unknown .swiper-wrapper")
  }
}