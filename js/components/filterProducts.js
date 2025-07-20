import renderProductCard from './renderProductCard.js';

// Фильтровать товары
export default function filterProducts(products) {
    try {
        changeTypeCount(products);
        sortProducts(products);

        const catalogFormEl = document.querySelector('.catalog-form');

        // Фильтрация и рендер товаров при выборе параметров в форме фильтрации
        catalogFormEl.addEventListener('input', () => {
            const checkedTypes = catalogFormEl.querySelectorAll('input[type="checkbox"]:checked');
            const selectedTypes = Array.from(checkedTypes).map(input => input.value);

            const statusInputs = catalogFormEl.querySelector('input[type="radio"]:checked');

            // Фильтрация по наличию
            let filtered = [...products];
            if (statusInputs.value === 'instock') {
                filtered = filtered.filter(product =>
                    Object.values(product.availability).some(count => count > 0)
                );
            }

            // Фильтрация по типам
            if (selectedTypes.length > 0) {
                filtered = filtered.filter(product =>
                    selectedTypes.some(type => product.type.includes(type))
                );
            }

            renderProductCard(filtered);
        });

        // Сброс фильтра
        catalogFormEl.addEventListener('reset', () => {
            renderProductCard(products);
        });

    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
    }
}

// Поменять колличество товаров на странице в каждой категории
function changeTypeCount(products) {
    const catalogFormEl = document.querySelector('.catalog-form');
    
    const filterTypeEls = catalogFormEl.querySelectorAll('.custom-checkbox__label');

    filterTypeEls.forEach(type => {
        const filterType = type.getAttribute('for');

        let typeCount = 0;

        products.forEach(product => {
            if(product.type.includes(filterType)) {
                typeCount++;
            }
        });

        type.querySelector('.custom-checkbox__count').textContent = typeCount;
    });
}

// Сортировать товары
function sortProducts(products) {
    const sortSelectEl = document.querySelector('.catalog__sort-select');

    let sorted = [...products];

    sortSelectEl.addEventListener('change', function (e) {
        const value = e.target.value;

        if(value === 'price-min') {
            sorted.sort((a, b) => a.price.new - b.price.new)
        } else if(value === 'price-max') {
            sorted.sort((a, b) => b.price.new - a.price.new)
        } else if(value === 'rating-max') {
            sorted.sort((a, b) => b.rating - a.rating)
        }

        renderProductCard(sorted);
    });
}