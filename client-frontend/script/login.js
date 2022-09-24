const usernameInputEl = document.getElementById("usernameInput");
const passwordInputEl = document.getElementById("passwordInput");
const authSubmitBtnEl = document.getElementById("authSubmitBtn");
const responseEl = document.getElementById("response");

authSubmitBtnEl.addEventListener("click", (e) => {
  e.preventDefault();

  axios({
    method: "POST",
    url: "http://localhost/jacht/client_login.php",
    data: {
      userName: usernameInputEl.value,
      password: passwordInputEl.value,
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response.data);
      responseEl.classList.remove("opacity");

      //   if (response.data == "Username Not Found!") {
      //     responseEl.textContent = response.data;
      //   } else {
      //     responseEl.textContent = "Logged in";
      //     window.setTimeout(function () {
      //       window.location.href = "homepage.html";
      //     }, 200000);
      //   }

      if (response.data == "Username Not Found!") {
        responseEl.textContent = response.data;
      }
      if (response.data == "Incorrect Password!") {
        responseEl.textContent = response.data;
      } else {
        responseEl.textContent = "Logged in";
        window.setTimeout(function () {
          window.location.href = "homepage.html";
        }, 200000);
      }
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
});
