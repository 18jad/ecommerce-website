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
      console.log(response);
      responseEl.classList.remove("opacity");
      if (response.data == true) {
        responseEl.textContent = "Acoount Created";
        window.setTimeout(function () {
          window.location.href = "homepage.html";
        }, 2000);
      } else {
        responseEl.textContent = response.data;
      }
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
});
