const userNameInput = document.getElementById("username");
const passwordInput = document.getElementById("paswordInput");
const authSubmitBtnEl = document.getElementById("authSubmitBtn");
const responseEl = document.getElementById("response");

authSubmitBtnEl.addEventListener("click", (e) => {
  e.preventDefault();

  axios({
    method: "POST",
    url: "http://localhost/ecommerce-website/ecommerce-server/seller_login.php",
    data: {
      userName: userNameInput.value,
      password: passwordInput.value,
    },
    headers: { "Content-Type": "multipart/form-data" },
  })

  .then(function (response) {
    //handle success
    responseEl.classList.remove("opacity");
    if (response.data == "Email Not Found!") {
      responseEl.textContent = response.data;
      userNameInput.value = "";
      passwordInput.value = "";
    } else if (response.data == "Incorrect Password!") {
      responseEl.textContent = response.data;
      passwordInput.value = "";
    } else {
      responseEl.textContent = "Logged in";
      const localStorageData = [];
      localStorageData.push(response.data.id);
      localStorageData.push(response.data.userName);
      localStorageData.push(response.data.token);
      localStorage.setItem("auth", JSON.stringify(localStorageData));
      window.setTimeout(function () {
        window.location.href = "index.html";
      }, 2000);
    }
  })
