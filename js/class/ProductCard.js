import * as components from "../components/components.js";
import sanitize from "../components/sanitize.js";

export default class ProductCard {
    constructor(product) {
        this.product = product;

        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.image = product.image;
        this.availability = product.availability;
        this.goodsOfDay = product.goodsOfDay;
    }

    // Получить элемент карточки товара
    getElement() {
        this.cardEl = components.getDivEl('product-card');

        const visualWrapEl = components.getDivEl('product-card__visual');
        const imgEl = this.getProductImgEl();
        const productBtnEl = this.getProductBtnEl();
        visualWrapEl.append(imgEl, productBtnEl);

        const infoWrapEl = this.getInfoWrapEl();
        const tooltipWrapEl = this.getTooltipWrapEl();
        infoWrapEl.append(tooltipWrapEl);

        this.cardEl.append(visualWrapEl, infoWrapEl);

        return this.cardEl;
    }

    // Получить элемент картинки с высотой и шириной
    getProductImgEl() {
        const imgEl = components.getImgEl(
            'product-card__img', this.image, 'Изображение товара'
        );
        imgEl.height = 436;
        imgEl.width = 290;
        return imgEl;
    }

    // Получить элемент блока с кнопками "В корзину" и "Подробнее"
    getProductBtnEl() {
        const moreBtnWrapEl = components.getDivEl('product-card__more');
        const basketBtnEl = components.getBtnEl('product-card__link btn btn--icon');
        const detailBtnEl = components.getBtnEl('product-card__link btn btn--secondary');

        basketBtnEl.setAttribute('data-id', this.id);
        basketBtnEl.innerHTML = `
            <span class="btn__text">В корзину</span>
            <svg width="24" height="24" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-basket"></use>
            </svg>
        `;

        detailBtnEl.innerHTML = `
            <span class="btn__text">Подробнее</span>
        `;

        moreBtnWrapEl.append(basketBtnEl, detailBtnEl);

        return moreBtnWrapEl;
    }

    // Получить элемент блока с ценой товара
    getInfoWrapEl() {
        const infoWrapEl = components.getDivEl('product-card__info');

        infoWrapEl.innerHTML = `
            <h2 class="product-card__title">${sanitize(this.name)}</h2>
            <span class="product-card__old">
                <span class="product-card__old-number">${sanitize(this.price.old)}</span>
                <span class="product-card__old-add">₽</span>
            </span>
            <span class="product-card__price">
                <span class="product-card__price-number">${sanitize(this.price.new)}</span>
                <span class="product-card__price-add">₽</span>
            </span>
        `;

        return infoWrapEl;
    }

    // Получить элемент блока с тултипом товара
    getTooltipWrapEl() {
        const tooltipWrapEl = components.getDivEl('product-card__tooltip tooltip');

        this.tooltipBtnEl = document.createElement('button');
        this.tooltipBtnEl.className = 'tooltip__btn';
        this.tooltipBtnEl.ariaLabel = 'Показать подсказку';
        this.tooltipBtnEl.innerHTML = `
            <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-i"></use>
            </svg>
        `;

        this.tooltipContentEl = components.getDivEl('tooltip__content');
        this.tooltipContentEl.innerHTML = `
            <span class="tooltip__text">Наличие товара по городам:</span>
            <ul class="tooltip__list">
            <li class="tooltip__item">
                <span class="tooltip__text">Москва: 
                    <span class="tooltip__count">${sanitize(this.availability.moscow)}</span>
                </span>
            </li>
            <li class="tooltip__item">
                <span class="tooltip__text">Оренбург: 
                    <span class="tooltip__count">${sanitize(this.availability.orenburg)}</span>
                </span>
            </li>
            <li class="tooltip__item">
                <span class="tooltip__text">Санкт-Петербург: 
                    <span class="tooltip__count">${sanitize(this.availability.saintPetersburg)}</span>
                </span>
            </li>
            </ul>
        `;

        this.openTooltip(this.tooltipBtnEl, this.tooltipContentEl.innerHTML);

        tooltipWrapEl.append(this.tooltipBtnEl);

        return tooltipWrapEl;
    }

    // Открыть всплывающую подсказку при наведении 
    openTooltip(btn, contentEl) {
        tippy(btn, {
            content: contentEl,
            allowHTML: true,
            placement: 'top-end',
            arrow: false,
            theme: 'custom',
        });
    }
}