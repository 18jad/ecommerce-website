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