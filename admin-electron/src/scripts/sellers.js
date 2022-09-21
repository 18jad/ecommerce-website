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
})

/**
 * Edit seller info modal:
 *  - Open and close modal
 *  - Set name in header and input field
 */

const modalContainer = document.querySelector('.edit-modal-container'),
    editModal = document.querySelector('.edit-modal'),
    openModalBtns = document.querySelectorAll('.editBtn'),
    closeEditModalBtn = document.querySelector('.close-edit-modal'),
    modalHeaderName = document.getElementById('sellerNameHeader'),
    oldSellerName = document.getElementById('oldSellerName');


const openModal2 = (btn) => {
    modalContainer.classList.add('show-modal');
    editModal.classList.add('show-modal-content');
    modalHeaderName.textContent = btn.dataset.name;
    oldSellerName.value = btn.dataset.name;
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