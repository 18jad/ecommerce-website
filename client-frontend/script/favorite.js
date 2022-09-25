// Init Variables
const favoritesEl = document.querySelector(".favorite");
const divLogo = document.querySelector(".logo");
let localStorageData = JSON.parse(localStorage.getItem("auth"));

//Check if Authorized
axios({
  method: "POST",
  url: "http://localhost/ecommerce-website/ecommerce-server/authorized.php",
  data: {
    userName: localStorageData[1],
    token: localStorageData[2],
  },
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    //handle success
    if (response.data === true) {
      fetchFavoriteData(localStorageData[0]);
    } else {
      localStorage.clear();
      window.location.href = "login.html";
    }
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });

const fetchFavoriteData = (id) => {
  axios({
    method: "POST",
    url: "http://localhost/ecommerce-website/ecommerce-server/view_favorites.php",
    data: {
      user_id: id,
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      fillData(response.data);
      responseData = response.data;
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};

const removeFavorite = () => {
  const removeButton = document.querySelectorAll(".removeButton");

  removeButton.forEach((removebtn) => {
    removebtn.addEventListener("click", (removebtn) => {
      axios({
        method: "POST",
        url: "http://localhost/ecommerce-website/ecommerce-server/favorite_remove.php",
        data: {
          user_id: localStorageData[0],
          product_id: removebtn.path[2].id,
        },
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          responseData.pop(removebtn.path[2].id);
          fillData(responseData);
          // console.log(responseData);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    });
  });
};

const fillData = (data) => {
  const favoriteArr = [];
  for (let i = 0; i < data.length; i++) {
    let favoriteHtml = `<div class="items-showcase" id="${data[i]["id"]}">
        <div class="product-container">
        <button class="removeButton">X</button>
          <div class="product-image">
              <img class="product-image-size" src="${data[i]["photo"]}">
          </div>
          <div class="product-text">
              <p class="product-text-1">${data[i]["category"]}</p>
              <div class="product-text-2">
                  <b>${data[i]["name"]}</b>
              </div>
              <p class="product-price">$${data[i]["price"]}</p>
          </div>
      </div>
  </div>`;
    favoriteArr.push(favoriteHtml);
  }
  favoritesEl.innerHTML = favoriteArr.join("");
  removeFavorite();
};

divLogo.addEventListener("click", () => {
  window.location.href = "homepage.html";
});
