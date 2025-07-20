import * as components from "../components/components.js";

export default class BasketCard {
    constructor(product, index) {
        this.id = product.id;
        this.image = product.image;
        this.name = product.name;
        this.price = product.price;

        this.index = index;
    }

    // Получить элемент карточки товара
    getElement() {
        const basketItemEl = document.createElement('li');
        basketItemEl.classList.add('basket__item');

        const imgWrapEl = components.getDivEl('basket__img');
        const imgEl = this.getProductImgEl();
        imgWrapEl.append(imgEl);

        const nameEl = components.getTextEl('basket__name', this.name);
        const priceEl = components.getTextEl('basket__price',);
        priceEl.textContent = `${this.price.new} руб`;

        const btnCloseEl = this.getBtnCloseEl();

        basketItemEl.append(imgWrapEl, nameEl, priceEl, btnCloseEl)

        return basketItemEl;
    }

    // Получить элемент картинки с высотой и шириной
    getProductImgEl() {
        const imgEl = components.getImgEl(
            '', this.image, 'Фотография товара'
        );
        imgEl.height = 60;
        imgEl.width = 60;
        return imgEl;
    }

    // Получить элемент кнопки с иконкой крестека
    getBtnCloseEl() {
        const btnEl = document.createElement('button');
        btnEl.className = 'basket__close';
        btnEl.type = 'button';
        btnEl.setAttribute('data-index', this.index);

        btnEl.innerHTML = `
            <svg class="basket__icon" width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-close"></use>
            </svg>
        `;

        return btnEl;
    }
}