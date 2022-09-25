const chatEl = document.querySelector(".chat");
const chatPopupEl = document.querySelector(".chat-popup");
const closeEl = document.querySelector(".close");
const userAmountEl = document.querySelector(".user-amount");
const searchDataEl = document.querySelector(".search-data");
const searchOutputEl = document.querySelector(".search-output");
const mainCarouselEl = document.querySelector(".main-carousel");

chatEl.addEventListener("click", () => {
  chatPopupEl.classList.toggle("none");
});

closeEl.addEventListener("click", () => [chatPopupEl.classList.add("none")]);

let localStorageData = JSON.parse(localStorage.getItem("auth"));
// console.log(localStorageData[1]);

axios({
  method: "POST",
  url: "http://localhost/jacht/authorized.php",
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
    url: "http://localhost/jacht/client_navbar.php",
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
    url: "http://localhost/jacht/client_search.php",
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
  url: "http://localhost/jacht/client_feed.php",
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    setTimeout(() => {
      //handle success
      // console.log(response.data[1][0]["price"]);
      const carouselDataArr = [];
      for (let i = 0; i < response.data[1].length; i++) {
        // console.log("hahah");
        let carouselData = `
        <div class="carousel-cell">
          <div class="carousel-img">
          <img src="assets/Screenshot from 2022-09-22 09-45-55.png" alt="">
          <div class="carousel-btns">
                      <button class="carousel-btn-new">new</button>
                  </div>
                  <div class="carousel-icons">
                      <div>
                          <i class="fa-solid fa-cart-shopping"></i>
                      </div>
                      <div>
                          <i class="fa-solid fa-eye"></i>
                      </div>
                  </div>
              </div>
              <div class="carousel-text">
                  <p class="carousel-text-1">${response.data[1][i]["category"]}</p>
                  <div class="carousel-text-2">
                      <b>${response.data[1][i]["name"]}</b>
                      <a href="">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round" class="feather feather-heart">
                              <path
                                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                              </path>
                          </svg>
                      </a>
                  </div>
                  <p class="carousel-price">${response.data[1][i]["price"]}$</p>
              </div>
          </div>
  `;

        mainCarouselEl.insertAdjacentHTML("afterend", carouselDataArr);
        // console.log(carouselDataArr);
      }
      mainCarouselEl.innerHTML = carouselDataArr.join("");
    }, 500);
  })

  .catch(function (response) {
    //handle error
    console.log(response);
  });
