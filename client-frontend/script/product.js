const plusBtnEl = document.querySelector(".plus-btn");
const minusBtnEl = document.querySelector(".minus-btn");
const plusMinusInputEl = document.querySelector(".plus-minus-input");
let slideIndex = 1;

plusBtnEl.addEventListener("click", () => {
  document.querySelector(".plus-minus-input").value++;
});

minusBtnEl.addEventListener("click", () => {
  if (document.querySelector(".plus-minus-input").value > 0) {
    document.querySelector(".plus-minus-input").value--;
  } else {
    document.querySelector(".plus-minus-input").value = 0;
  }
});
