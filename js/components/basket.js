import BasketCard from "../class/BasketCard.js";

export default function actionsWithBasket(products) {
    openBasket();
    addProductInBasket(products);

    renderBasketCard();
}

// Открыть корзину
function openBasket() {
    const basketEl = document.querySelector('.basket');
    const basketBtnEl = document.querySelector('#open-basket');
    
    basketBtnEl.addEventListener('click', () => {
        basketEl.classList.toggle('basket--active');
    });
}

// Добавить товар в корзину
function addProductInBasket(products) {
    const addBasketBtnEls = document.querySelectorAll('.product-card__link.btn.btn--icon');

    addBasketBtnEls.forEach(addBtn => {
        addBtn.addEventListener('click', function (e) {

            products.forEach(product => {
                if (+e.target.dataset.id === product.id) {
                    addProductToLocalStorage(product);
                    renderBasketCard(product);
                }
            });
        });
    });
}

// Отрисовка корзины 
function renderBasketCard() {  
    const productsInBasket = getProductsFromLocalStorage();

    const basketCountEl = document.querySelector('.header__user-count');
    basketCountEl.textContent = productsInBasket.length;

    const basketListEl = document.querySelector('.basket__list');
    basketListEl.innerHTML = '';

    productsInBasket.forEach((product, index) => {
        const card = new BasketCard(product, index);

        basketListEl.append(card.getElement());
    });

    const emptyBlockEl = document.querySelector('.basket__empty-block');
    const basketLinkEl = document.querySelector('.basket__link');

    // Отображение надписи, если корзина пуста и наоборот
    if (productsInBasket.length > 0) {
        basketLinkEl.style.display = 'flex';
        emptyBlockEl.style.display = 'none';
    } else if (productsInBasket.length === 0) {
        basketLinkEl.style.display = 'none';
        emptyBlockEl.style.display = 'block';
    }

    // Обработчик событий на кнопки удаления
    document.querySelectorAll('.basket__close').forEach(deleteBtn => {
        deleteBtn.addEventListener('click', deleteProduct);
    });
}

// Добавить товар в локальное хранилище
function addProductToLocalStorage(product) {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    basket.push(product);
    localStorage.setItem('basket', JSON.stringify(basket));
}

// Получить массив товаров из локального хранилища
function getProductsFromLocalStorage() {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    return basket;
}

// Удалить продукт в корзине
function deleteProduct(e) {
    const productsInBasket = getProductsFromLocalStorage();
    const deleteIndex = e.target.dataset.index;
            
    productsInBasket.splice(deleteIndex, 1);

    localStorage.setItem('basket', JSON.stringify(productsInBasket));
    renderBasketCard();
}