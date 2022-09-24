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

const showSlides = (n) => {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
};

showSlides(slideIndex);

const plusSlides = (n) => {
  showSlides((slideIndex += n));
};

const currentSlide = (n) => {
  showSlides((slideIndex = n));
};