const emailInputEl = document.getElementById('emailInput');
const passwordInputEl = document.getElementById('passwordInput');
const authSubmitBtnEl = document.getElementById('authSubmitBtn');


authSubmitBtnEl.addEventListener('click', (e) => {
    e.preventDefault()
    console.log("CLICKED");
})