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
  // console.log(id);
  let products = Array.from(localStorage.getItem("product_id"));

  for (let i = 0; i < products.length; i++) {
    if (products[i] == "[" || products[i] == "]" || products[i] == ",") {
      products.splice(i, 1);
      i--;
    }
  }

  // console.log(products);
  const tablesProducts = [];
  for (let i = 0; i < products.length; i++) {
    // console.log(products[i]);

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
        // console.log(response.data[0]["photo"]);

        let table = `
           <tr>
            <td><img src="${response.data[0]["photo"]}" alt=""></td>
            <td>${response.data[0]["name"]}</td>
            <td>${response.data[0]["price"]}</td>
            <td>QUANTITY</td>
            <td>COUNT</td>
            <td><i class="fa-solid fa-xmark"></i></td>
        </tr>`;

        document
          .querySelector(".table-header")
          .insertAdjacentHTML("afterend", table);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  // console.log(tablesProducts);
  //  += tablesProducts;
};
