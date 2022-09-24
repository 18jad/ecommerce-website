/**
 * Fetch all clients:
 *      - Show all details on clients page
 *
 */

(() => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/client_data.php",
        clientsTable = document.querySelector('.clients-table'),
        bannedClientsTable = document.querySelector('.banned-clients');
    axios({
        method: "GET",
        url: _URL,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        //handle success
        let clients = response.data;
        clients.forEach((client) => {
            let clientId = client.id,
                clientName = client.name,
                clientUsername = client.username,
                clientBanned = client.is_banned,
                clientPhoto = client.photo,
                clientDate = client.date_joined;

            if (!Boolean(clientBanned)) {
                let clientHTML = `
                <div class="client">
                    <p class="client-id">#${clientId}</p>
                    <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                        alt="profile" class="client-image">
                    <p class="client-name">${clientName}</p>
                    <p class="client-date-joined">${clientDate}</p>
                    <button class="banBtn" data-id="${clientId}" data-username="${clientUsername}">Ban</button>
                </div>`
                clientsTable.innerHTML += clientHTML;
            } else {
                let bannedClientHTML = `
                            <div class="banned-client">
                                <p class="banned-id">${clientId}</p>
                                <p class="banned-name">${clientName}</p>
                                <button class="unban-btn" data-id="${clientId}" data-username="${clientUsername}">Unban</button>
                            </div>`
                bannedClientsTable.innerHTML += bannedClientHTML;
            }
        })
    }).catch((error) => {
        //handle error
        console.log(error)
    });
})();
