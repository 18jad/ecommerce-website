const plusBtnEl = document.querySelector('.plus-btn')
const minusBtnEl = document.querySelector('.minus-btn')
const plusMinusInputEl = document.querySelector('.plus-minus-input')

plusBtnEl.addEventListener("click", () => {
    document.querySelector('.plus-minus-input').value++;
})  

minusBtnEl.addEventListener("click", () => {
    document.querySelector('.plus-minus-input').value--;
})  