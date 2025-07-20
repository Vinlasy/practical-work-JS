// Открытие и закрытие аккордеона
export default function initAccordion() {
    const accordionBtnEls = document.querySelectorAll('.accordion__btn');

    accordionBtnEls.forEach(accordionBtn => {
        
        accordionBtn.addEventListener('click', () => {
            const activeAccordion = accordionBtn.classList.contains('accordion__btn--active');

            accordionBtnEls.forEach(btn => {
                btn.classList.remove('accordion__btn--active');
            });

            if (!activeAccordion) {
                accordionBtn.classList.add('accordion__btn--active');
            }
        });
    });
}