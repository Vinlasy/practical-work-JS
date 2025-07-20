import ProductCard from "../class/ProductCard.js";

// Вывести товары на страницу с пагинацией
export default function renderProductCard(products) {
    // Пагинация блока с товарами
    const paginationWrapEl = document.querySelector('.catalog__pagination');
    paginationWrapEl.innerHTML = '';

    // Колличество страниц
    const paginationCounts = Math.ceil(products.length / 6);

    // Переменная под нужный номер страницы
    let paginationIndex = 0;

    const groupProducts = chunkArray(products, 6);

    renderPaginationPage(groupProducts[0]);

    // Создать кнопки пагинации
    for (let i = 0; i < paginationCounts; i++) {
        const paginationItemEl = document.createElement('li');
        paginationItemEl.className = 'catalog__pagination-item';

        const paginationBtnEl = getBtnEl(i);
        
        paginationItemEl.append(paginationBtnEl);
        paginationWrapEl.append(paginationItemEl);

        // Обработчик событий с рендером нужной страницы
        paginationBtnEl.addEventListener('click', (e) => {
            paginationIndex = +e.target.dataset.index;

            renderPaginationPage(groupProducts[paginationIndex]);
        });
    }
}

// Рендер выбранной страницы с товарами
function renderPaginationPage(groupProducts) {
    const catalogListEl = document.querySelector('.catalog__list');
    catalogListEl.innerHTML = '';

    groupProducts.forEach(product => {
        const catalogItemEl = document.createElement('li');
        catalogItemEl.classList.add('catalog__item');

        const card = new ProductCard(product);
        
        catalogItemEl.append(card.getElement());

        catalogListEl.append(catalogItemEl);
    });
}

// Получить элемент кнопки
function getBtnEl(index) {
    const btnEl = document.createElement('button');
    btnEl.className = 'catalog__pagination-link';
    btnEl.setAttribute('data-index', index);
    btnEl.textContent = index + 1;
    return btnEl;
}

// Разбить массив на массив массивов
function chunkArray(array, chunkSize) {
    const result = [];

    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }

    return result;
}