/**
 * Upload image button:
 *  - Click the hidden file input
 *  - Set image name next to button
 */

// const profileInput = document.getElementById("sellerProfile"),
//     uploadProfileBtn = document.getElementById("profileUploadBtn"),
//     imageName = document.getElementById("profileName");

let selectedImageName, base64Image;

// update image name on every change
// const updateImageName = (name) => {
//     imageName.textContent = name;
// }

// convert image to base64
const imageToBase64 = (imageInput) => {
    let filesSelected = imageInput.files;
    if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            base64Image = fileLoadedEvent.target.result;
        }
        fileReader.readAsDataURL(fileToLoad);
    }
}

// uploadProfileBtn.addEventListener("click", () => {
//     profileInput.click();
//     profileInput.onchange = () => {
//         const [uploadedFileDetails] = profileInput.files;
//         // if no image is chosen
//         if (profileInput.files.length == 0) {
//             selectedImageName = null;
//             updateImageName("No image uploaded");
//             return;
//             // if an image is chosen
//         } else if (profileInput.value && profileInput.value.trim().length > 0 && profileInput.files.length > 0) {
//             // save image name
//             selectedImageName = uploadedFileDetails.name || profileInput.value.split("\\").pop();
//             // convert image to base64
//             imageToBase64(profileInput, base64Image)
//             // update the name next to button
//             updateImageName(selectedImageName);
//         }
//     }
// });

/**
 * Get sellers details:
 *      - Get all sellers
 *      - Show sellers inside the table
 */

(() => {
    const sellersTable = document.querySelector('.clients-table'),
        _URL = "http://localhost/ecommerce-website/ecommerce-server/seller_data.php";

    axios({
        method: "GET",
        url: _URL,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        let sellers = response.data;
        sellers.forEach(seller => {
            let sellerName = seller.name,
                sellerUsername = seller.username,
                sellerDescription = seller.description,
                sellerPhoto = (seller.photo == null || seller.photo == "" || seller.photo == "NULL") ? "./assets/empty-profile.jpg" : seller.photo,
                sellerId = seller.id,
                sellerDate = seller.date_joined,
                sellerMoney = seller.money;

            let sellerHTML = `
                <div class="client">
                    <p class="client-id">#${sellerId}</p>
                    <img src="${sellerPhoto}"
                        alt="profile" class="client-image">
                    <p class="client-name">${sellerName}</p>
                    <p class="client-date-joined">${sellerDate}</p>
                    <div class="action">
                        <button class="deleteBtn" data-id="${sellerId}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <button class="editBtn" data-name="${sellerName}" data-id="${sellerId}" data-description="${sellerDescription}">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                </div>`

            sellersTable.innerHTML += sellerHTML;
        })
    }).catch((error) => { })

})();

// "id": ,
//     "name": "",
//         "username": "",
//             "password": "",
//                 "description": "",
//                     "money": ,
//                         "photo": ,
//                             "date_joined": ""


/**
 * Edit seller info modal:
 *  - Open and close modal
 *  - Set name in header and input field
 */

const editSeller = (sellerID, newName = null, newDescription = null, newPhoto = null) => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/seller_update_profile.php";
    axios({
        method: "POST",
        url: _URL,
        data: {
            id: sellerID,
            name: newName,
            description: newDescription,
            photo: newPhoto
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        alert(error)
    });
}

setTimeout(() => {

    const modalContainer = document.querySelector('.edit-modal-container'),
        editModal = document.querySelector('.edit-modal'),
        openModalBtns = document.querySelectorAll('.editBtn'),
        closeEditModalBtn = document.querySelector('.close-edit-modal'),
        modalHeaderName = document.getElementById('sellerNameHeader'),
        oldSellerName = document.getElementById('oldSellerName'),
        oldDescription = document.getElementById('oldDescriptionInput'),
        editForm = document.querySelector('.edit-modal-content');


    const openModal2 = (btn) => {
        modalContainer.classList.add('show-modal');
        editModal.classList.add('show-modal-content');
        modalHeaderName.textContent = btn.dataset.name;
        oldSellerName.value = btn.dataset.name;
        oldDescription.value = btn.dataset.description;
        editForm.dataset.id = btn.dataset.id;
    }

    const closeModal2 = () => {
        modalContainer.classList.remove('show-modal');
        editModal.classList.remove('show-modal-content');
    }

    // open by button
    openModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal2(btn)
        });
    })
    // close by button
    closeEditModalBtn.addEventListener('click', closeModal2);

    // close by clicking outside modal
    modalContainer.addEventListener('click', (e) => {
        if (!editModal.contains(e.target)) {
            closeModal2()
        }
    });

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let newDescription = oldDescription.value,
            newName = oldSellerName.value;

        editSeller(e.target.dataset.id, newDescription, newName);
    })
}, 100)


/**
 * Delete seller:
 *      - Delete seller pressing a button
 *      - Delete seller by entering his id
 */


const deleteSeller = (sellerID) => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/seller_delete.php";
    const result = document.getElementById('responseResult');
    axios({
        method: "POST",
        url: _URL,
        data: {
            seller_id: sellerID,
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        result.textContent = "Seller successfully deleted";
        result.classList.remove("failed");
        result.classList.add("success");
        result.classList.add("show-result");
        setTimeout(() => {
            result.classList.remove("show-result");
            window.location.reload();
        }, 2000)
    }).catch((error) => {
        result.textContent = "Error occured please try again " + error;
        result.classList.remove("success");
        result.classList.add("failed");
        result.classList.add("show-result");
    });

}

setTimeout(() => {
    // delete seller by button
    const deleteBtns = document.querySelectorAll('.deleteBtn');

    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            deleteSeller(btn.dataset.id)
        })
    })

    // delete seller by id input
    const sellerIDInput = document.getElementById('idInput'),
        deleteForm = document.querySelector('.search-container');

    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let selletID = sellerIDInput.value;
        deleteSeller(selletID);
    })
}, 200)


/**
 * Add new seller
 */

const addNewSeller = (username, name, password, description) => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/seller_add.php";
    axios({
        method: "POST",
        url: _URL,
        data: {
            userName: username,
            name,
            password,
            description
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        if (response.data == "success") {
            alert("Successfully created new seller");
            window.location.reload();
        } else {
            alert(response.data);
        }
    }).catch((error) => {
        alert(error);
    });
}



setTimeout(() => {
    const addSellerForm = document.getElementById("addNewUserForm"),
        newSellerName = document.getElementById("nameInput"),
        newSellerUsername = document.getElementById("usernameInput"),
        newSellerPassword = document.getElementById("passwordInput"),
        newSellerDescription = document.getElementById("descriptionInput");

    addSellerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let sellerName = newSellerName.value,
            sellerUsername = newSellerUsername.value,
            sellerPassword = newSellerPassword.value,
            sellerDescription = newSellerDescription.value;

        addNewSeller(sellerUsername, sellerName, sellerPassword, sellerDescription);
    })
}, 300)