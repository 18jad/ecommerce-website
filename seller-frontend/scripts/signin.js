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
