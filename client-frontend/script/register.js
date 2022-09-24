const nameInputEl = document.getElementById("nameInput");
const usernameInputEl = document.getElementById("usernameInput");
const emailInputEl = document.getElementById("emailInput");
const passwordInputEl = document.getElementById("passwordInput");
const authSubmitBtnEl = document.getElementById("authSubmitBtn");
const responseEl = document.getElementById("response");

authSubmitBtnEl.addEventListener("click", (e) => {
  e.preventDefault();

  axios({
    method: "POST",
    url: "http://localhost/jacht/client_register.php",
    data: {
      userName: usernameInputEl.value,
      name: nameInputEl.value,
      email: emailInputEl.value,
      password: passwordInputEl.value,
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      console.log(response.data);
      responseEl.classList.remove("opacity");
      if (response.data == true) {
        responseEl.textContent = "Acoount Created";
      } else {
        responseEl.textContent = response.data;
        
      }
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
});
