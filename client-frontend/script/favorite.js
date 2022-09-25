// Init Variables
let localStorageData = JSON.parse(localStorage.getItem("auth"));

//Check if Authorized
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
    fetchWishlistData(localStorageData[0]);
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
      url: "http://localhost/fswo5/jacht/view_favorites.php",
      data: {
        user_id: id,
      },
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (response) {
        //handle success
        console.log(response.data);
        fillData(response.data);
        responseData = response.data;
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });
};

const fillData = (data) => {
    const favoriteArr = [];
    for (let i = 0; i < data.length; i++) {
      console.log(data);
      let favoriteHtml = `<div class="items-showcase">
        <div class="product-container">
          <div class="product-image">
              <img class="product-image-size" src="assets/Screenshot from 2022-09-22 09-45-55.png">
          </div>
          <div class="product-text">
              <p class="product-text-1">Decor, furniture</p>
              <div class="product-text-2">
                  <b>Trauma furniture</b>
              </div>
              <p class="product-price">$119.00</p>
          </div>
      </div>
  </div>`;
    favoriteArr.push(favoriteHtml);
    }
  
    wishlistsEl.innerHTML = favoriteArr.join("");
};
