let localStorageData = JSON.parse(localStorage.getItem("auth"));
const profileInputEl = document.getElementById("profile-input");

if (profileInputEl.files[0] != undefined) {
  const readFile = (profileInputEl) => {
    const FR = new FileReader();
    FR.addEventListener("load", (evt) => {
      srcData = evt.target.result;
      console.log(srcData);
    });
    FR.readAsDataURL(profileInputEl.files[0]);
  };
  readFile(profileInputEl);
}

axios({
  method: "POST",
  url: "http://localhost/ecommerce-website/ecommerce-server/client_update_profile.php",
  data: {
    id: localStorageData[0],
    name: localStorageData[1],
    // photo: ,
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
