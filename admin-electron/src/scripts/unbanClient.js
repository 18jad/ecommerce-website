/**
 * Unban client:
 *      - Unban client by clicking on button inside banned user modal
 */

(() => {
    setTimeout(() => {
        const unbanButtons = document.querySelectorAll('.unban-btn');

        const _URL = "http://localhost/ecommerce-website/ecommerce-server/admin_ban_client.php";

        const unbanClient = (clientUsername) => {
            axios({
                method: "POST",
                url: _URL,
                data: {
                    userName: clientUsername,
                },
                headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {
                if (response.data == true) {
                    alert(`User ${clientUsername} successfully ubanned`);
                    window.location.reload();
                } else {
                    alert("Error occured please try again");
                }
            }).catch((error) => {
                alert(error);
            });
        }

        unbanButtons.forEach(button => {
            button.addEventListener('click', () => {
                unbanClient(button.dataset.username)
            })
        })
    }, 100);
})(); 2