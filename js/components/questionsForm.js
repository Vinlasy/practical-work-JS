import * as components from "../components/components.js";

// Работа валидации формы
export default function validateQuestionForm() {
    const validate = new JustValidate('.questions__form');

    validate.addField('#name', [
        {
            rule: 'required',
            errorMessage: 'Введите ваше имя',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Минимальная длина три символа',
        },
        {
            rule: 'maxLength',
            value: 20,
            errorMessage: 'Максимальная длина двадцать символов',
        },
    ])
    .addField('#email', [
        {
            rule: 'required',
            errorMessage: 'Введите вашу почту', 
        },
        {
            rule: 'email',
            errorMessage: 'Почта введена неверно',
        },
    ])
    .addField('#agree', [
        {
            rule: 'required',
            errorMessage: 'Согласие обязательно', 
        },
    ])
    .onSuccess(async function (e) {
        const formData = new FormData(e.target);
        const actionUrl = e.target.getAttribute('action');
        
        try {
            const response = await fetch(actionUrl, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                renderResultSubmit(true);
            }
        } catch (error) {
            renderResultSubmit(false);
        }
    })
}

// Показ модального окна с результатом отправки
function renderResultSubmit(isSubmit) {
    const blackoutEl = document.createElement('div');
    blackoutEl.classList.add('questions__blackout');

    const alertEl = components.getDivEl('questions__alert');

    const alertTextEl = components.getTextEl('questions__alert-text');
    alertTextEl.textContent = isSubmit ? 'Благодарим за обращение!' : 'Не удалось отправить обращение';
    
    const alertCloseEl = components.getBtnEl('questions__alert-close');
    alertCloseEl.innerHTML = `
        <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
    `;

    alertEl.append(alertTextEl, alertCloseEl);

    document.body.append(alertEl, blackoutEl);

    alertCloseEl.addEventListener('click', () => {
        alertEl.remove();
        blackoutEl.remove();
    });

    blackoutEl.addEventListener('click', () => {
        alertEl.remove();
        blackoutEl.remove();
    });
}