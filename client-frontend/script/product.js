const plusBtnEl = document.querySelector(".plus-btn");
const minusBtnEl = document.querySelector(".minus-btn");
const plusMinusInputEl = document.querySelector(".plus-minus-input");
const mySlidesEl = document.querySelector(".mySlides img");
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

axios({
  method: "POST",
  url: "http://localhost/jacht/product_retrieve.php",
  data: {
    prodId: 1,
  },
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    //handle success
    console.log(response.data[0]["photo"]);
    mySlidesEl.src = response.data[0]["photo"];
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });
