import ProductCard from "../class/ProductCard.js";

// Реализация слайдера
export default function slider(products) {
    renderDayProduct(products);

    new Swiper('.swiper', {
        spaceBetween: 40,
        slidesPerView: 4,
        navigation: {
            nextEl: '.day-products__navigation-btn--next',
            prevEl: '.day-products__navigation-btn--prev',
        },
    });
}

// Вывести товары дня на страницу
function renderDayProduct(products) {
    const catalogListEl = document.querySelector('.day-products__list');
    catalogListEl.innerHTML = '';

    products.forEach(product => {
        const catalogItemEl = document.createElement('li');
        catalogItemEl.classList.add('day-products__item', 'swiper-slide');

        const card = new ProductCard(product);
        const cardEl = card.getElement();
        
        if (card.goodsOfDay) {
            cardEl.classList.add('product-card--small');
            
            catalogItemEl.append(cardEl);
            catalogListEl.append(catalogItemEl);
        } else {
            return
        }
    });
}