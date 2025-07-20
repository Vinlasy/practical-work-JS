// Получить элемент <div>
function getDivEl (className) {
    const divEl = document.createElement('div');
    divEl.className = className;
    return divEl;
}

// Получить элемент картинки
function getImgEl (className, src, alt) {
    const imgEl = document.createElement('img');
    imgEl.className = className;
    imgEl.src = src;
    imgEl.alt = alt;
    return imgEl;
}

// Получить элемент текста <span>
function getTextEl (className, text = '') {
    const textEl = document.createElement('span');
    textEl.className = className;
    textEl.textContent = text;
    return textEl;
}

// Получить элемент кнопки
function getBtnEl (className) {
    const btnEl = document.createElement('button');
    btnEl.className = className;
    btnEl.type = 'button';
    return btnEl;
}

export {
    getDivEl,
    getImgEl,
    getTextEl,
    getBtnEl,
}