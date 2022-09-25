const nameInputEl = document.getElementById("nameInput");
const usernameInputEl = document.getElementById("usernameInput");
const emailInputEl = document.getElementById("emailInput");
const passwordInputEl = document.getElementById("passwordInput");
const authSubmitBtnEl = document.getElementById("authSubmitBtn");
const responseEl = document.getElementById("response");

authSubmitBtnEl.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    usernameInputEl.value === "" ||
    nameInputEl.value === "" ||
    emailInputEl.value === "" ||
    passwordInputEl.value === ""
  ) {
    responseEl.classList.remove("opacity");
    responseEl.textContent = "Please fill inputs";
  } else {
    axios({
      method: "POST",
      url: "http://localhost/fswo5/jacht/client_register.php",
      data: {
        userName: usernameInputEl.value,
        name: nameInputEl.value,
        email: emailInputEl.value,
        password: passwordInputEl.value,
      },
      headers: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      //handle success
      console.log(response);
      responseEl.classList.remove("opacity");
      if (response.data == true) {
        responseEl.textContent = "Account Created";
        window.setTimeout(function () {
          window.location.href = "login.html";
        }, 2000);
      } else {
        responseEl.textContent = response.data;
      }
    });
  }
});
