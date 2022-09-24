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
};
