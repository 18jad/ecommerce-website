let localStorageData = JSON.parse(localStorage.getItem("auth"));
const tableEl = document.querySelector(".table-header");

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
      shoppingCartFetch();
    }
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });

const shoppingCartFetch = () => {
  // let products = Array.from(localStorage.getItem("product_id"));
  let products = [];
  let quantity = [];
  products = JSON.parse(localStorage.getItem("product_id"));

  quantity = JSON.parse(localStorage.getItem("quantity"));

  console.log(products, quantity);

  for (let i = 0; i < products.length; i++) {
    axios({
      method: "POST",
      url: "http://localhost/fswo5/jacht/product_retrieve.php",
      data: {
        prodId: products[i],
      },
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        // console.log(response.data[0]["id"]);
        //handle success
        let table = `
          <tr>
            <td><img class="cart-image" src="${
              response.data[0]["photo"]
            }" alt="product image"></td>
            <td>${response.data[0]["name"]}</td>
            <td>${response.data[0]["price"]}</td>
            <td>${quantity[i]}</td>
            <td>${quantity[i] * response.data[0]["price"]}</td>
            <td class="close-icon" id ="${response.data[0]["id"]}" >
              <svg class="close-icon" id ="${
                response.data[0]["id"]
              }" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                <path
                d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
              </svg>
            </td>
          </tr>`;

        tableEl.insertAdjacentHTML("afterend", table);
        // const removesvgEl = document.querySelector("svg");
        const removebtnEl = document.querySelector("svg");
        // console.log(removebtnEl);

        removebtnEl.addEventListener("click", (removebtn) => {
          console.log(removebtn.path[1]["id"]);

          let productRemoved = products.indexOf(
            Number(removebtn.path[1]["id"])
          );

          products.splice(productRemoved, 1);
          quantity.splice(productRemoved, 1);
          console.log(products, quantity);

          localStorage.setItem("product_id", JSON.stringify(products));
          localStorage.setItem("quantity", JSON.stringify(quantity));
          location.reload();
        });
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }
};

axios({
  method: "POST",
  url: "http://localhost/fswo5/jacht/client_purchase.php",
  data: {
    userId: localStorage.getItem("product_id"),
    prodId: localStorage.getItem("product_id"),
  },
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    //handle success
    if (response.data === true) {
      shoppingCartFetch();
    }
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });
