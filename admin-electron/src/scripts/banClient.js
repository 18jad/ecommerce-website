/**
 * Ban clients:
 *  - Ban clients by clicking on ban button
 *  - Ban clients by input username
 */

(() => {
    setTimeout(() => {
        // Ban by button
        const banButtons = document.querySelectorAll('.banBtn'),
            result = document.getElementById('responseResult');

        const _URL = "http://localhost/ecommerce-website/ecommerce-server/admin_ban_client.php";

        const banClient = (clientUsername) => {
            axios({
                method: "POST",
                url: _URL,
                data: {
                    userName: clientUsername,
                },
                headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {
                console.log(response)
                if (response.data == true) {
                    result.textContent = "User banned successfully";
                    result.classList.remove("failed");
                    result.classList.add("success");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                } else {
                    result.textContent = "Error occured please try again";
                    result.classList.remove("success");
                    result.classList.add("failed");
                }
                result.classList.add("show-result");
                setTimeout(() => {
                    result.classList.remove("show-result");
                }, 2000)
            }).catch((error) => {
                console.log(error);
            });
        }

        banButtons.forEach(button => {
            button.addEventListener('click', () => {
                banClient(button.dataset.username)
            })
        })


        // Ban by entering username
        const usernameInput = document.getElementById('idInput'),
            banForm = document.querySelector('.search-container');

        banForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let username = usernameInput.value;
            banClient(username);
        });
    }, 100)
})();