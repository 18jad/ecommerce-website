const emailInputEl = document.getElementById("emailInput");
const passwordInputEl = document.getElementById("passwordInput");
const authSubmitBtnEl = document.getElementById("authSubmitBtn");
const responseEl = document.getElementById("response");

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
      responseEl.classList.remove("opacity");

      if (response.data == "Username Not Found!") {
        responseEl.textContent = response.data;
      } else {
        responseEl.textContent = "Logged in";
        window.setTimeout(function () {
          window.location.href = "homepage.html";
        }, 2000);
      }
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
});
