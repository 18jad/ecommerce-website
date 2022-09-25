const usernameInputEl = document.getElementById("usernameInput");
const passwordInputEl = document.getElementById("passwordInput");
const authSubmitBtnEl = document.getElementById("authSubmitBtn");
const responseEl = document.getElementById("response");

authSubmitBtnEl.addEventListener("click", (e) => {
  e.preventDefault();

  axios({
    method: "POST",
    url: "http://localhost/ecommerce-website/ecommerce-server/client_login.php",
    data: {
      userName: usernameInputEl.value,
      password: passwordInputEl.value,
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      responseEl.classList.remove("opacity");
      if (response.data == "Username Not Found!") {
        responseEl.textContent = response.data;
        usernameInputEl.value = "";
        passwordInputEl.value = "";
      } else if (response.data == "Incorrect Password!") {
        responseEl.textContent = response.data;
        passwordInputEl.value = "";
      } else {
        responseEl.textContent = "Logged in";
        const localStorageData = [];
        localStorageData.push(response.data.id);
        localStorageData.push(response.data.userName);
        localStorageData.push(response.data.token);
        localStorage.setItem("auth", JSON.stringify(localStorageData));
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
