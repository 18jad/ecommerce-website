let localStorageData = JSON.parse(localStorage.getItem("auth"));

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
      shoppingCartFetch(localStorageData[0]);
    }
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });

const shoppingCartFetch = (id) => {
  console.log(id);

  // const productsId = [];
  // productsId.push(localStorage.getItem("product_id"));
  // const quantity = localStorage.getItem("quantity");
  // console.log(productsId, quantity);

  // for (let i = 0; i < productsId.length; i++) {
  //   console.log(i);
  // }

  let products = Array.from(localStorage.getItem("product_id"));

  for (let i = 0; i < products.length; i++) {
    if (products[i] == "[" || products[i] == "]" || products[i] == ",") {
      products.splice(i, 1);
      i--;
    }
  }



  // console.log(typeof localStorage.getItem("product_id"));
};
