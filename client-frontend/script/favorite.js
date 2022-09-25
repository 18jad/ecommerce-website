
//Check if Authorized
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
  

