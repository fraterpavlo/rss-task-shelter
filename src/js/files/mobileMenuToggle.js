// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
export let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		setTimeout(() => {
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
    
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
export let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

// Модуь работы с меню (бургер) =======================================================================================================================================================================================================================

function closeMenuOnAnyCloseClick (event) {
	const menuBody = document.querySelector(".header-menu__body");
	const isNotEventOnMenuBody =  event.target !== menuBody;

	if (isNotEventOnMenuBody) toggleMenu(event);
}

function toggleMenu (e) {
	e.stopPropagation();
	bodyLockToggle();
	const isMenuOpen = document.documentElement.classList.contains("menu-open");

	// if (isMenuOpen) {
	// 	document.documentElement.classList.toggle("menu-open");
	// 	document.removeEventListener("click", closeMenuOnAnyCloseClick);
	// } else {
	// 	document.documentElement.classList.toggle("menu-open");
	// 	document.addEventListener("click", closeMenuOnAnyCloseClick);
	// }

	isMenuOpen
	? document.removeEventListener("click", closeMenuOnAnyCloseClick)
	: document.addEventListener("click", closeMenuOnAnyCloseClick);
	
	document.documentElement.classList.toggle("menu-open");
}

export function menuInit() {
	const iconMenu = document.querySelector(".icon-menu");	
	if (iconMenu) {
		iconMenu.addEventListener("click", toggleMenu);
	};
};
