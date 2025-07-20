// Инициализация всех кнопок в header
export default function initHeaderButton() {
    openBurgerMenu();
    openLocationCity();
}

// Открыть и закрыть бургерное меню
function openBurgerMenu() {
    const openBurgerBtnEl = document.querySelector('.header__catalog-btn');
    const closeBurgerBtnEl = document.querySelector('.main-menu__close');
    const burgerEl = document.querySelector('.main-menu');

    openBurgerBtnEl.addEventListener('click', function () {
        burgerEl.classList.add('main-menu--active');
    });
    
    closeBurgerBtnEl.addEventListener('click', function () {
        burgerEl.classList.remove('main-menu--active');
    });
}

// Открыть и выбрать город
function openLocationCity() {
    const locatCityBtnEl = document.querySelector('.location__city');
    const locatCityNameEl = document.querySelector('.location__city-name');
    const cityesEl = document.querySelectorAll('.location__sublink');

    locatCityBtnEl.addEventListener('click', function () {
        locatCityBtnEl.classList.toggle('location__city--active');
    });

    cityesEl.forEach(city => {
        city.addEventListener('click', function () {
            locatCityNameEl.textContent = city.textContent;

            locatCityBtnEl.classList.remove('location__city--active');
        });
    });
}