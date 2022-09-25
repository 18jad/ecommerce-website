const axios = require('axios').default;
const ads = document.querySelectorAll('ad-input');

const _URL = "http://localhost/ecommerce-website/ecommerce-server/seller_login.php";
axios({
    method: "POST",
    url: _URL,
    data: {
      userName: username,
      password,
    },
    headers: { "Content-Type": "multipart/form-data" },
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


const adsInput = document.getElementById("ad-input");
    

