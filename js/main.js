import initHeaderButton from './components/headerButton.js';
import initAccordion from './components/accordion.js';

import getProductsData from './components/getProductsData.js';
import renderProductCard from './components/renderProductCard.js';
import filterProducts from './components/filterProducts.js';

import actionsWithBasket from './components/basket.js';

import slider from './components/slider.js';

import validateQuestionForm from './components/questionsForm.js'

window.addEventListener('DOMContentLoaded', async () => {

    initHeaderButton();
    initAccordion();

    validateQuestionForm()

    try {
        const products = await getProductsData();

        renderProductCard(products);
        filterProducts(products);

        slider(products);

        actionsWithBasket(products);
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
    }

});
