/**
 * Sign in
 */

(() => {

  const usernameInput = document.getElementById('username'),
    passwordInput = document.getElementById('passwordInput'),
    signInForm = document.querySelector('form'),
    result = document.querySelector('.result');

  const signIn = (username, password) => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/seller_login.php";
    axios({
      method: "POST",
      url: _URL,
      data: {
        userName: username,
        password,
      },
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      let status = response.data;
      if (typeof status == 'string') {
        if (status == "Incorrect Password!") {
          result.textContent = "Incorrect password";
        } else {
          result.textContent = "Incorrect username";
        }
        result.dataset.status = "failed";
      } else {
        console.log(status);
        result.textContent = "Sign in successfully done";
        result.dataset.status = "success";
        setTimeout(() => {
          localStorage.setItem("seller_token", status.token);
          localStorage.setItem("seller_id", status.id);
          localStorage.setItem("seller_username", status.userName);
          window.location.reload();
        }, 2000)
      }
      setTimeout(() => {
        result.classList.remove('show-result');
      }, 2000)
      result.classList.add("show-result");
    }).catch((error) => {
      console.log(error);
    });
  }

  signInForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let username = usernameInput.value,
      password = passwordInput.value;
    signIn(username, password);
  })
})();