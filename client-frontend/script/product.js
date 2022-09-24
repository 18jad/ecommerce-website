const plusBtnEl = document.querySelector(".plus-btn");
const minusBtnEl = document.querySelector(".minus-btn");
const plusMinusInputEl = document.querySelector(".plus-minus-input");
const mySlidesEl = document.querySelector(".mySlides img");
const rightSectionEl = document.querySelector(".right-section h2");
const descriptionEl = document.querySelector(".description");
const rightSectionh3El = document.querySelector(".right-section h3");

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
    console.log(response.data);
    mySlidesEl.src = response.data[0]["photo"];
    rightSectionEl.textContent = response.data[0]["name"];
    descriptionEl.textContent = response.data[0]["description"];
    rightSectionh3El.textContent = `${response.data[0]["price"]}$`;
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });
