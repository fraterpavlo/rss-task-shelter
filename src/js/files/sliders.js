/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Grid } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
	//BildSlider
	let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
	if (sliders) {
		sliders.forEach(slider => {
			slider.parentElement.classList.add('swiper');
			slider.classList.add('swiper-wrapper');
			for (const slide of slider.children) {
				slide.classList.add('swiper-slide');
			}
		});
	}
}
// Инициализация слайдеров
function initSliders() {
	// Добавление классов слайдера
	// при необходимости отключить
	// bildSliders();

	// Перечень слайдеров
	if (document.querySelector('.swiper-main-page')) {
		new Swiper('.swiper-main-page', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			/*
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			slidesPerGroup: 3,
			loopFillGroupWithBlank: true,
			spaceBetween: 90,
			autoHeight: false,
			speed: 800,
			touchRatio: 1,
			simulateTouch: true,
			loop: true,
			//preloadImages: false,
			//lazy: true,

			// Dotts
			//pagination: {
			//	el: '.slider-quality__pagging',
			//	clickable: true,
			//},

			// Arrows
			navigation: {
				nextEl: '.friends-slider__controls_right',
				prevEl: '.friends-slider__controls_left',
			},

			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 10,
					slidesPerGroup: 1,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 40,
					slidesPerGroup: 2,
				},
				1279: {
					slidesPerView: 3,
					slidesPerGroup: 3,
					spaceBetween: 90,
				},
			},

			on: {

			}
		});
	}
	if (document.querySelector('.swiper-pets-page')) {
		new Swiper('.swiper-pets-page', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Grid],
			/*
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/
			observer: true,
			observeParents: true,
			// loopFillGroupWithBlank: true,
			autoHeight: false,
			simulateTouch: true,
			loop: false,
			//preloadImages: false,
			//lazy: true,
			speed: 800,
			touchRatio: 1,
			slidesPerView: 4,
			slidesPerGroup: 4,
			grid: {
				rows: 2,
				fill: "row",
			},
			spaceBetween: 40,
			

			// Dotts
			//pagination: {
			//	el: '.slider-quality__pagging',
			//	clickable: true,
			//},

			// Arrows
			navigation: {
				nextEl: '.friends-slider__controls_next',
				prevEl: '.friends-slider__controls_prev',
			},


			breakpoints: {
				320: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					spaceBetween: 30,
					grid: {
						rows: 3,
					},
				},
				768: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 40,
					grid: {
						rows: 3,
					},
				},
				1279: {
					slidesPerView: 4,
					slidesPerGroup: 4,
					spaceBetween: 40,
				},
			},

			on: {
				init: function (swiper) {
					const toFirstSlideBtn = document.querySelector(".friends-slider__controls_to-first");
					if (!toFirstSlideBtn) throw new Error("toFirstSlideBtn not found");
					const toLastSlideBtn = document.querySelector(".friends-slider__controls_to-last");
					if (!toLastSlideBtn) throw new Error("toLastSlideBtn not found");

					toFirstSlideBtn.addEventListener("click", toEdgeOnClick)
					toLastSlideBtn.addEventListener("click", toEdgeOnClick)

					function toEdgeOnClick (event) {
						if (event.currentTarget === toFirstSlideBtn) {
							swiper.setProgress(0, 500);
						} else if (event.currentTarget === toLastSlideBtn) {
							swiper.setProgress(1, 500);
						} else {
							throw new Error("check currentTarget toEdgeOnClick");
						}
					}
				},
				progress: function (swiper, progress) {
					const toFirstSlideBtn = document.querySelector(".friends-slider__controls_to-first");
					if (!toFirstSlideBtn) throw new Error("toFirstSlideBtn not found");
					const toLastSlideBtn = document.querySelector(".friends-slider__controls_to-last");
					if (!toLastSlideBtn) throw new Error("toLastSlideBtn not found");

					if (progress === 0) {
						toFirstSlideBtn.classList.add("swiper-button-disabled");
						toLastSlideBtn.classList.remove("swiper-button-disabled");
					} else if (progress === 1) {
						toLastSlideBtn.classList.add("swiper-button-disabled");
						toFirstSlideBtn.classList.remove("swiper-button-disabled");
					} else {
						toFirstSlideBtn.classList.remove("swiper-button-disabled");
						toLastSlideBtn.classList.remove("swiper-button-disabled");
					}
				},
				snapIndexChange: function (swiper) {
					console.log('snapIndexChange() сработал');
					const paginationOutput = document.querySelector(".friends-slider__controls_output");

					if (paginationOutput) {
						paginationOutput.textContent = swiper.snapIndex + 1;
					} else {
						throw new Error("paginationOutput not found")
					}
				},
				
			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	// bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});