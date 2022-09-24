/**
 * Upload image button:
 *  - Click the hidden file input
 *  - Set image name next to button
 */

const profileInput = document.getElementById("sellerProfile"),
    uploadProfileBtn = document.getElementById("profileUploadBtn"),
    imageName = document.getElementById("profileName");

let selectedImageName, base64Image;

// update image name on every change
const updateImageName = (name) => {
    imageName.textContent = name;
}

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

uploadProfileBtn.addEventListener("click", () => {
    profileInput.click();
    profileInput.onchange = () => {
        const [uploadedFileDetails] = profileInput.files;
        // if no image is chosen
        if (profileInput.files.length == 0) {
            selectedImageName = null;
            updateImageName("No image uploaded");
            return;
            // if an image is chosen
        } else if (profileInput.value && profileInput.value.trim().length > 0 && profileInput.files.length > 0) {
            // save image name
            selectedImageName = uploadedFileDetails.name || profileInput.value.split("\\").pop();
            // convert image to base64
            imageToBase64(profileInput, base64Image)
            // update the name next to button
            updateImageName(selectedImageName);
        }
    }
});

/**
 * Get sellerse details:
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
                sellerPhoto = seller.photo,
                sellerId = seller.id,
                sellerDate = seller.date_joined,
                sellerMoney = seller.money;

            let sellerHTML = `
                <div class="client">
                    <p class="client-id">#${sellerId}</p>
                    <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                        alt="profile" class="client-image">
                    <p class="client-name">${sellerName}</p>
                    <p class="client-date-joined">${sellerDate}</p>
                    <div class="action">
                        <button class="deleteBtn">
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

// "id": 2,
//     "name": "ali",
//         "username": "test4",
//             "password": "f1be22d31a6243fa5f9828cc0717408eefa861031eb2e840a544e41642d751ca",
//                 "description": "abclkjljk",
//                     "money": 2000,
//                         "photo": null,
//                             "date_joined": "22 Sep 2022 @ 15:15"


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
        console.log(error)
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
