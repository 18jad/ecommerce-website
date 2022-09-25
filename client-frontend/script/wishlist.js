const wishlistsEl = document.getElementById("wishlists");
let localStorageData = JSON.parse(localStorage.getItem("auth"));
// console.log(localStorageData);
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

let responseData;
let imageRes;
const fetchWishlistData = (id) => {
  // console.log(id);
  axios({
    method: "POST",
    url: "http://localhost/jacht/view_wishlist.php",
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
  const wishlistArr = [];
  for (let i = 0; i < data.length; i++) {
    console.log(data);
    let wishlistHtml = `        <div class="wishlist">
                <div class="wishlist-details">
                    <svg class="delete" id="${data[i]["id"]}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-trash-2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>

                    <img src= ${data[i]["photo"]} alt="">
                </div>
                <p class="wishlist-name">${data[i]["name"]}</p>
                <p class="wishlist-price">$${data[i]["price"]}</p>
                <p class="wishlist-status">In Stock</p>
                <div class="wishlist-cart">
                    <p>Added on ${data[i]["times_favorited"]}</p>
                    <button id="${data[i]["id"]}" >Add to cart</button>
                </div>
            </div>`;
    wishlistArr.push(wishlistHtml);
  }

  wishlistsEl.innerHTML = wishlistArr.join("");
  addCartClickedBtn();
  removewishClickedBtn();
};

const removewishClickedBtn = () => {
  const removebtnEl = document.querySelectorAll(".wishlist-details svg");

  removebtnEl.forEach((removebtn) => {
    removebtn.addEventListener("click", (removebtn) => {
      console.log(removebtn.path[0].id);
      axios({
        method: "POST",
        url: "http://localhost/jacht/wishlist_remove.php",
        data: {
          user_id: localStorageData[0],
          product_id: removebtn.path[0].id,
        },
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          responseData.pop(removebtn.path[0].id);
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

const productIdQuantity = (productId, quantity) => {
  let product_id = [];
  let quantity_product = [];

  // Parse the serialized data back into an aray of objects
  product_id = JSON.parse(localStorage.getItem("product_id")) || [];
  quantity_product = JSON.parse(localStorage.getItem("quantity")) || [];
  // Push the new data (whether it be an object or anything else) onto the array

  // console.log(product_id);
  if (product_id.includes(productId)) {
    for (let i = 0; i < product_id.length; i++) {
      if (product_id[i] === productId) {
        quantity_product[i] = quantity_product[i] + 1;
      }
    }
  } else {
    product_id.push(productId);
    quantity_product.push(quantity);
  }
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("product_id", JSON.stringify(product_id));
  localStorage.setItem("quantity", JSON.stringify(quantity_product));
};

const addCartClickedBtn = () => {
  const addCartEl = document.querySelectorAll("button");

  addCartEl.forEach((addCartbtn) => {
    addCartbtn.addEventListener("click", (btn) => {
      productId = Number(btn.path[0].id);
      productIdQuantity(productId, 1);
    });
  });
};
