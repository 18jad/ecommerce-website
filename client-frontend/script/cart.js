let localStorageData = JSON.parse(localStorage.getItem("auth"));
const tableEl = document.querySelector(".table-header");

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
      url: "http://localhost/jacht/product_retrieve.php",
      data: {
        prodId: products[i],
      },
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        let table = `
           <tr>
            <td><img class="cart-image" src="${
              response.data[0]["photo"]
            }" alt=""></td>
            <td>${response.data[0]["name"]}</td>
            <td>${response.data[0]["price"]}</td>
            <td>${quantity[i]}</td>
            <td>${quantity[i] * response.data[0]["price"]}</td>
            <td><i class="fa-solid fa-xmark"></i></td>
        </tr>`;

        tableEl.insertAdjacentHTML("afterend", table);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }
};
