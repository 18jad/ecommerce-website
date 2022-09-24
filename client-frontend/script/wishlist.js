let localStorageData = JSON.parse(localStorage.getItem("auth"));
console.log(localStorageData);
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
      fetchWishlistData(localStorageData[1]);
    } else {
      localStorage.clear();
      window.location.href = "login.html";
    }
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });

const fetchWishlistData = (id) => {
  axios({
    method: "POST",
    url: "http://localhost/jacht/view_wishlist.php",
    data: {
      user_id: id,
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      console.log(response.data);
      //handle success
      if (response.data === true) {
        fetchWishlistData();
      } else {
        // localStorage.clear();
        // window.location.href = "login.html";
      }
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};
