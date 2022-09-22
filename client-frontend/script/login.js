const emailInputEl = document.getElementById('emailInput');
const passwordInputEl = document.getElementById('passwordInput');
const authSubmitBtnEl = document.getElementById('authSubmitBtn');


authSubmitBtnEl.addEventListener('click', (e) => {
    e.preventDefault();

    axios({
        method: "post",
        url: "http://localhost/ecommerce-server/client_register.php",
        data: {
            userName: "Hassan",
            password: "khalil",
            email: "hasaan@",
            name: "Hassan"
        },
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });

})