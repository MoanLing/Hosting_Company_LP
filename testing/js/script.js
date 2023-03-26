const btnToggler = document.getElementById('toggle-pay__btn'),
    innerTogglerEl = document.getElementById('toggle-pay__btn-inner-toggle');

btnToggler.addEventListener("click", togglePackFunc);

function togglePackFunc() {

    if (innerTogglerEl.classList.contains('toggle-pay__btn-inner-toggle--activated')) {
        innerTogglerEl.classList.remove('toggle-pay__btn-inner-toggle--activated');
    }

    else {
        innerTogglerEl.classList.add('toggle-pay__btn-inner-toggle--activated');
    }
}