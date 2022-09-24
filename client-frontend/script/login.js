const emailInputEl = document.getElementById("emailInput");
const passwordInputEl = document.getElementById("passwordInput");
const authSubmitBtnEl = document.getElementById("authSubmitBtn");

authSubmitBtnEl.addEventListener("click", (e) => {
  e.preventDefault();

  axios({
    method: "POST",
    url: "http://localhost/jacht/client_login.php",
    data: {
      userName: emailInputEl.value,
      password: passwordInputEl.value,
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response.data);
        if (response.data == "Username Not Found!") {
            
        }
      //   responseEl.classList.remove("opacity");
      //   if (response.data == true) {
      //     responseEl.textContent = "Acoount Created";
      //     window.setTimeout(function () {
      //       window.location.href = "homepage.html";
      //     }, 2000);
      //   } else {
      //     responseEl.textContent = response.data;
      //   }
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
});
