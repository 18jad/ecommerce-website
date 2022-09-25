const chatEl = document.querySelector(".chat");
const chatPopupEl = document.querySelector(".chat-popup");
const closeEl = document.querySelector(".close");
const userAmountEl = document.querySelector(".user-amount");
const searchDataEl = document.querySelector(".search-data");
const searchOutputEl = document.querySelector(".search-output");
const brandNewProduct = document.querySelector(".brand-new-product-items");
const brandNewProduct1 = document.querySelector(".brand-new-product-items-1");
const topSellerMainEl = document.querySelector(".top-seller-main");

chatEl.addEventListener("click", () => {
  chatPopupEl.classList.toggle("none");
});

closeEl.addEventListener("click", () => [chatPopupEl.classList.add("none")]);

let localStorageData = JSON.parse(localStorage.getItem("auth"));
// console.log(localStorageData[1]);

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
      fetchingnavbarData();
    } else {
      localStorage.clear();
      window.location.href = "login.html";
    }
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });

const fetchingnavbarData = () => {
  // console.log(localStorageData[0]);

  axios({
    method: "POST",
    url: "http://localhost/fswo5/jacht/client_navbar.php",
    data: {
      user_id: localStorageData[0],
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      // console.log(response.data);
      userAmountEl.textContent = `${response.data[0]["money"]}$`;
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};

searchDataEl.addEventListener("keyup", () => {
  const searchOutputs = [];
  searchOutputEl.classList.remove("none");
  axios({
    method: "POST",
    url: "http://localhost/fswo5/jacht/client_search.php",
    data: {
      searchQuery: searchDataEl.value,
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success

      searchOutputEl.innerHTML = "";
      for (let i = 0; i < response.data.length; i++) {
        let serchOutput = `
        <a id="${response.data[i]["id"]}" class="search-output-output"
            <h1>${response.data[i]["name"]}</h1>
            <p>${response.data[i]["price"]}</p>
        </a>`;
        searchOutputs.push(serchOutput);
      }

      searchOutputEl.innerHTML = searchOutputs.join("");
      // console.log(searchOutputs);
      const searchOutputOutputEl = document.querySelectorAll(
        ".search-output-output"
      );
      searchOutputOutputEl.forEach((clicked) => {
        clicked.addEventListener("click", (clicked) => {
          console.log(clicked.path[0]["id"]);
          window.location.href = `product.html?product_id=${clicked.path[0]["id"]}`;
        });
      });
      console.log(searchOutputOutputEl);
    })

    .catch(function (response) {
      //handle error
      console.log(response);
    });
});

axios({
  method: "POST",
  url: "http://localhost/fswo5/jacht/client_feed.php",
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    //handle success
    // console.log(response.data[1]);
    // console.log(response.data[1][0]["price"]);

    const brandNewProductItemsArr = [];

    for (let i = 0; i < response.data[1].length; i++) {
      // console.log(i);
      let brandNewItems = `
       <div class="brand-new-product-item">
                <div class="carousel-img">
                    <img src=${response.data[1][i]["photo"]} alt="">
                    <div class="carousel-btns">
                        <button class="carousel-btn-new">new</button>
                    </div>
                    <div class="carousel-icons">
                    <a href=cart.html?product_id=${response.data[1][i]["id"]}>
                        <div>
                            <!-- shopping cart icon -->
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                        </a>
                        <a href=product.html?product_id=${response.data[1][i]["id"]}>
                        <div>
                            <!-- eye icon -->
                            <i class="fa-solid fa-eye"></i>
                        </div>
                        </a>
                    </div>
                </div>
                <div class="carousel-text">
                    <p class="carousel-text-1">${response.data[1][i]["category"]}</p>
                    <div class="carousel-text-2">
                        <b>${response.data[1][i]["name"]}</b>
                        <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="feather feather-heart">
                                <path
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                                </path>
                            </svg>
                        </a>
                    </div>
                    <p class="carousel-price">$${response.data[1][i]["price"]}</p>
                </div>
            </div>
    `;
      brandNewProductItemsArr.push(brandNewItems);
    }
    brandNewProduct.innerHTML = brandNewProductItemsArr.join("");
  })

  .catch(function (response) {
    //handle error
    console.log(response);
  });

axios({
  method: "POST",
  url: "http://localhost/fswo5/jacht/client_feed.php",
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    //handle success
    // console.log(response.data[1]);
    // console.log(response.data[1][0]["price"]);

    const brandNewProductItemsArr = [];

    for (let i = 0; i < response.data[0].length; i++) {
      // console.log(i);
      let brandNewItems = `
       <div class="brand-new-product-item">
                <div class="carousel-img">
                    <img src=${response.data[0][i]["photo"]} alt="">
                    <div class="carousel-btns">
                        <button class="carousel-btn-new">new</button>
                    </div>
                    <div class="carousel-icons">
                    <a href=cart.html?product_id=${response.data[0][i]["id"]}>
                        <div>
                            <!-- shopping cart icon -->
                            <i class="fa-solid fa-cart-shopping"></i>
                        </div>
                        </a>
                        <a href=product.html?product_id=${response.data[0][i]["id"]}>
                        <div>
                            <!-- eye icon -->
                            <i class="fa-solid fa-eye"></i>
                        </div>
                        </a>
                    </div>
                </div>
                <div class="carousel-text">
                    <p class="carousel-text-1">${response.data[0][i]["category"]}</p>
                    <div class="carousel-text-2">
                        <b>${response.data[0][i]["name"]}</b>
                        <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="feather feather-heart">
                                <path
                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                                </path>
                            </svg>
                        </a>
                    </div>
                    <p class="carousel-price">$${response.data[0][i]["price"]}</p>
                </div>
            </div>
    `;
      brandNewProductItemsArr.push(brandNewItems);
    }
    brandNewProduct1.innerHTML = brandNewProductItemsArr.join("");
  })

  .catch(function (response) {
    //handle error
    console.log(response);
  });

axios({
  method: "POST",
  url: "http://localhostfswo5//jacht/client_feed.php",
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    //handle success
    // console.log(response.data[1]);
    console.log(response.data[0][0]);

    let brandNewItems = `
         <div class="top-seller-main-left">
                <img src= ${response.data[0][0]["photo"]} height="500px" alt="">
            </div>
            <div class="top-seller-main-right">
                <h3>${response.data[0][0]["name"]}</h3>
                <h5>${response.data[0][0]["category"]}</h5>
                <h5>Bought: 1000</h5>
                <button class="btn-price">$${response.data[0][0]["price"]} USD</button>
                <button class="btn-view-deatils">VIEW DETAILS</button>
            </div>
    `;

    topSellerMainEl.innerHTML = brandNewItems;
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });
