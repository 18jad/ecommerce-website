/**
 * Check if admin already logged in
 */

if (localStorage.getItem('admin_token')) {
    window.location = "./clients.html"
} else {

    /**
     * Admin login:
     *     - Grab username and password inputs
     *     - Fetch api and check user
     *     - Show result on screen
     *     - Save tokena and user id to localstorage
     *      
     */

    const usernameInput = document.getElementById("emailInput"),
        passwordInput = document.getElementById("passwordInput"),
        form = document.querySelector("form"),
        result = document.querySelector('.result');

    const _URL = 'http://localhost/ecommerce-website/ecommerce-server/admin_login.php';

    const login = (username, password) => {
        axios({
            method: "POST",
            url: _URL,
            data: {
                userName: username,
                password,
            },
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            //handle success
            let status = response.data;
            console.log(status)
            if (status == "Incorrect Username!") {
                // set result text to incorrect username and show it on screen with error design
                result.textContent = "Incorrect username!";
                result.dataset.type = "error";
                result.classList.add('result-show');
                setTimeout(() => {
                    result.classList.remove('result-show');
                }, 2000)
            } else if (status == "Incorrect Password!") {
                // set result text to incorrect password and show it on screen with error design
                result.textContent = "Incorrect password!";
                result.dataset.type = "error";
                result.classList.add('result-show');
                setTimeout(() => {
                    result.classList.remove('result-show');
                }, 2000)
            } else {
                // set admin token and id inside localstorage
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('admin_token', response.data.token);
                localStorage.setItem('userName', response.data.userName);
                // set result text to success and show it on screen with ok design
                result.textContent = "Sign in successfuly done";
                result.dataset.type = "ok";
                result.classList.add('result-show');
                setTimeout(() => {
                    result.classList.remove('result-show');
                    window.location = "../clients.html";
                }, 2000)
            }
        }).catch((error) => {
            //handle error
            console.log(error.data)
            result.textContent = `Error:`;
            result.dataset.type = "error";
            result.classList.add('result-show');
        });
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let username = usernameInput.value;
        let password = passwordInput.value;
        login(username, password);
    })
}