/**
 *  Create new product:
 *      - Upload product image button:
 *          - Click the hidden file input
 *          - Set image inside the preview frame
 *          - Remove the initial styles
 *      - Product info preview:
 *          - On input change update the preview text under image
 */

// Upload product image section
const uploadedProductImageInput = document.getElementById("uploadedProductImage"),
    uploadProductImageBtn = document.querySelector(".produt-image-container");

let base64Image;

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

uploadProductImageBtn.addEventListener("click", () => {
    // click the hidden file input
    uploadedProductImageInput.click();
    uploadedProductImageInput.onchange = () => {
        const [uploadedFileDetails] = uploadedProductImageInput.files;
        // if no image is chosen
        if (uploadedProductImageInput.files.length == 0) {
            // add styles back if no image is chosen
            uploadProductImageBtn.style.background = "transparent";
            uploadProductImageBtn.style.border = "3px dashed var(--aqua)";
            uploadProductImageBtn.innerHTML = '<i class="fa-regular fa-file-image"></i>'
            return;
            // if an image is chosen
        } else if (uploadedProductImageInput.value && uploadedProductImageInput.value.trim().length > 0 && uploadedProductImageInput.files.length > 0) {
            // remove image container border and icon and add uploaded image
            uploadProductImageBtn.style.border = "none";
            uploadProductImageBtn.innerHTML = "";

            // set image inside the preview box
            uploadProductImageBtn.style.backgroundImage = `url("${URL.createObjectURL(uploadedFileDetails)}")`;

            // convert image to base64
            imageToBase64(uploadedProductImageInput, base64Image)
        }
    }
})

// Product info preview
const productPreviewName = document.getElementById('productPreviewName'),
    productPreviewDescription = document.getElementById('productPreviewDescription'),
    productPreviewPrice = document.getElementById('productPreviewPrice'),
    productNameInput = document.getElementById('productNameInput'),
    descriptionInput = document.getElementById('descriptionInput'),
    priceInput = document.getElementById('priceInput');

// change the properties under image preview
const changeTextContent = (element, newContent) => {
    if (newContent.trim().length > 0) {
        element.textContent = newContent;
    } else {
        element.textContent = "";
    }
}

// on input change, update the preview inforamtion
productNameInput.addEventListener('input', (e) => {
    changeTextContent(productPreviewName, e.target.value);
})

descriptionInput.addEventListener('input', (e) => {
    changeTextContent(productPreviewDescription, e.target.value);
})

priceInput.addEventListener('input', (e) => {
    changeTextContent(productPreviewPrice, `$${e.target.value}`);
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
    newProductName = document.getElementById('newProductName'),
    newPriceInput = document.getElementById('newPriceInput'),
    newCategorie = document.getElementById('newCategorieSelector')


const openModal2 = (btn) => {
    modalContainer.classList.add('show-modal');
    editModal.classList.add('show-modal-content');
    // caching value inside dataset instead fetching everytime to get old values
    newProductName.value = btn.dataset.name;
    newPriceInput.value = btn.dataset.price;
    newCategorie.value = btn.dataset.categorie;
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



// Product Api Linking

//Adding Api Linking
//Adding a product on list api linking.
const productSubmitForm = document.getElementById("productFormSubmit")
const productInputName = document.getElementById("productNameInput")
const descriptionInputData = document.getElementById("descriptionInput")



      const addNewProduct = () => {
        const _URL = "http://localhost/ecommerce-website/ecommerce-server/product_add.php";
        axios({
            method: "POST",
            url: _URL,
            data: {
                productName: productInputName.value,
                description: descriptionInputData.value,
                image: "",
                price: ""
            },
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            if (response.data == "success") {
                alert("Successfully created new product");
                window.location.reload();
            } else {
                alert(response.data);
            }
        }).catch((error) => {
            alert(error);
        });
    }



   //Removing a product from seller list Api linking
    const deleteProduct = () => {
        const _URL = "http://localhost/ecommerce-website/ecommerce-server/product_remove.php";
        const result = document.getElementById('responseResult');
        axios({
            method: "POST",
            url: _URL,
            data: {
                product_id: productID,
            },
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            result.textContent = "product deleted";
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



// Editing a product data api linking

const editProduct = () => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/product_edit.php";
    axios({
        method: "POST",
        url: _URL,
        data: {
            productName: productInputName.value,
            description: descriptionInputData.value,
            image: "",
            price: ""
        },