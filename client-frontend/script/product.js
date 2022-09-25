const plusBtnEl = document.querySelector(".plus-btn");
const minusBtnEl = document.querySelector(".minus-btn");
const plusMinusInputEl = document.querySelector(".plus-minus-input");
const mySlidesEl = document.querySelector(".mySlides img");
const rightSectionEl = document.querySelector(".right-section h2");
const descriptionEl = document.querySelector(".description");
const rightSectionh3El = document.querySelector(".right-section h3");
const cartBtnEl = document.querySelector(".cart-btn");

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

let localStorageData = JSON.parse(localStorage.getItem("auth"));

axios({
  method: "POST",
  url: "http://localhost/fswo5/jacht/authorized.php",
  data: {
    userName: localStorageData[1],
    token: localStorageData[2],
  },
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    //handle success
    if (response.data === true) {
      fillProduct();
    } else {
      localStorage.clear();
      window.location.href = "login.html";
    }
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });

const fillProduct = () => {
  let params = new URLSearchParams(document.location.search);
  let name = params.get("product_id");
  axios({
    method: "POST",
    url: "http://localhost/fswo5/jacht/product_retrieve.php",
    data: {
      prodId: name,
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
      addCartBtn(response.data[0]["id"]);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};

const addCartBtn = (id) => {
  cartBtnEl.addEventListener("click", () => {
    // console.log(plusMinusInputEl.value);

    let product_id = [];
    let quantity_product = [];

    // Parse the serialized data back into an aray of objects
    product_id = JSON.parse(localStorage.getItem("product_id")) || [];
    quantity_product = JSON.parse(localStorage.getItem("quantity")) || [];

    if (product_id.includes(id)) {
      for (let i = 0; i < product_id.length; i++) {
        if (product_id[i] === id) {
          quantity_product[i] = Number(plusMinusInputEl.value);
        }
      }
    } else {
      product_id.push(id);
      quantity_product.push(plusMinusInputEl.value);
    }
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem("product_id", JSON.stringify(product_id));
    localStorage.setItem("quantity", JSON.stringify(quantity_product));
  });
};
