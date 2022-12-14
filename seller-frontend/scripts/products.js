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

setTimeout(() => {

    const modalContainer = document.querySelector('.edit-modal-container'),
        editModal = document.querySelector('.edit-modal'),
        openModalBtns = document.querySelectorAll('.editBtn'),
        closeEditModalBtn = document.querySelector('.close-edit-modal'),
        newProductName = document.getElementById('newProductName'),
        newPriceInput = document.getElementById('newPriceInput'),
        newCategorie = document.getElementById('newCategorieSelector'),
        formm = document.querySelector('.edit-modal-content'),
        desc = document.getElementById('newDescriptionInput');


    const openModal2 = (btn) => {
        modalContainer.classList.add('show-modal');
        editModal.classList.add('show-modal-content');
        // caching value inside dataset instead fetching everytime to get old values
        newProductName.value = btn.dataset.name;
        newPriceInput.value = btn.dataset.price;
        newCategorie.value = btn.dataset.categorie;
        desc.value = btn.dataset.description;
    }

    const closeModal2 = () => {
        modalContainer.classList.remove('show-modal');
        editModal.classList.remove('show-modal-content');
    }

    // open by button
    openModalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal2(btn)
            formm.dataset.id = btn.dataset.id;
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
}, 300);


// get all products
(() => {
    const productsTable = document.querySelector('.products-table');

    const _URL = "http://localhost/ecommerce-website/ecommerce-server/seller_products.php";
    axios({
        method: "POST",
        url: _URL,
        data: {
            sellerId: localStorage.getItem("seller_id"),
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        console.log(response)
        let products = response.data;
        products.forEach((product) => {
            let productCategory = product.category,
                productName = product.name,
                productDescription = product.description,
                productImage = product.photo,
                productId = product.id,
                productPrice = product.price;

            let productHTML = `
                <div class="product">
                    <p class="product-id">#${productId}</p>
                    <img src="${productImage}"
                        alt="profile" class="product-image">
                    <p class="product-name">${productName}</p>
                    <p class="product-categorie">${productCategory}</p>
                    <p class="product-date-joined">$${productPrice}</p>
                    <div class="action">
                        <button class="deleteBtn" data-id="${productId}">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <button class="editBtn" data-name="${productName}" data-price="${productPrice}" data-categorie="${productCategory}" data-description="${productDescription}" data-id="${productId}">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                </div>
                `
            productsTable.innerHTML += productHTML;
        })
    }).catch((error) => {
        console.log(error);
    })
})();


// Product Api Linking

const addResult = document.querySelector('.result-add');

//Add new product
const addNewProduct = (sellerUsername, productName, productCategory, productDescription, productPrice, productPhoto = null) => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/product_add.php";
    axios({
        method: "POST",
        url: _URL,
        data: productPhoto != null ? {
            userName: sellerUsername,
            name: productName,
            category: productCategory,
            description: productDescription,
            price: productPrice,
            photo: productPhoto,
        } : {
            userName: sellerUsername,
            name: productName,
            category: productCategory,
            description: productDescription,
            price: productPrice,

        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then(() => {
        addResult.textContent = "Product added successfully";
        addResult.hidden = false;
        setTimeout(() => {
            addResult.hidden = true;
            window.location.reload();
        }, 1500)
    }).catch((error) => {
        console.log(error);
    });
}

const newProductForm = document.getElementById('addNewProductForm'),
    categoryInput = document.getElementById('categorieSelector'),
    photoInput = document.getElementById('uploadedProductImage');

newProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let productName = productNameInput.value,
        productCategory = categoryInput.options[categoryInput.selectedIndex].value,
        productDescription = descriptionInput.value,
        productPrice = priceInput.value,
        filesSelected = photoInput.files;

    if (filesSelected.length > 0) {
        let fileToLoad = filesSelected[0];
        let fileReader = new FileReader();
        fileReader.onload = (fileLoadedEvent) => {
            let base64 = fileLoadedEvent.target.result;
            addNewProduct(localStorage.getItem('seller_username'), productName, productCategory, productDescription, productPrice, base64)
        }
        fileReader.readAsDataURL(fileToLoad);
    } else {
        addNewProduct(localStorage.getItem('seller_username'), productName, productCategory, productDescription, productPrice)
    }
})

const delResult = document.getElementById('responseResult');

// delete product by button
const deleteProduct = (productId) => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/product_remove.php";
    axios({
        method: "POST",
        url: _URL,
        data: {
            userName: localStorage.getItem('seller_username'),
            id: productId,
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        console.log(response);
        delResult.textContent = "Product successfully deleted";
        delResult.hidden = false;
        delResult.classList.add('failed')
        delResult.classList.remove('success')
        setTimeout(() => {
            delResult.hidden = true;
            window.location.reload();
        }, 2000)
    }).catch((error) => {
        console.log(error)
    });
}

setTimeout(() => {
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((btns) => {
        btns.addEventListener('click', () => {
            console.log(btns.dataset.id)
            deleteProduct(btns.dataset.id)
        })
    })
}, 300)


// Editing a product data api linking

let resultEdit;
setTimeout(() => {
    resultEdit = document.querySelector('.edit-result');
}, 300)

const editProduct = (productId, productName, productCategory, productDescription, productPrice, productPhoto = null) => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/product_edit.php";
    axios({
        method: "POST",
        url: _URL,
        data: productPhoto != null ? {
            userName: localStorage.getItem('seller_username'),
            id: productId,
            name: productName,
            category: productCategory,
            description: productDescription,
            price: productPrice,
            photo: productPhoto,
        } : {
            userName: localStorage.getItem('seller_username'),
            id: productId,
            name: productName,
            category: productCategory,
            description: productDescription,
            price: productPrice,
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((res) => {
        resultEdit.textContent = "Product added successfully";
        resultEdit.hidden = false;
        setTimeout(() => {
            resultEdit.hidden = true;
            window.location.reload();
        }, 1500)
    }).catch((error) => {
        console.log(error);
    });
}

setTimeout(() => {
    const editForm = document.querySelector('.edit-modal-content'),
        newProductDesc = document.getElementById('newDescriptionInput'),
        newPhotoInput = document.getElementById('newImage'),
        newProductName = document.getElementById('newProductName'),
        newPriceInput = document.getElementById('newPriceInput'),
        newCategorie = document.getElementById('newCategorieSelector')

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let filesSelected = newPhotoInput.files,
            newName = newProductName.value,
            newPrice = newPriceInput.value,
            newCategory = newCategorie.options[newCategorie.selectedIndex].value,
            newDescription = newProductDesc.value;

        if (filesSelected.length > 0) {
            let fileToLoad = filesSelected[0];
            let fileReader = new FileReader();
            fileReader.onload = (fileLoadedEvent) => {
                let base64 = fileLoadedEvent.target.result;
                editProduct(editForm.dataset.id, newName, newCategory, newDescription, newPrice, base64)
            }
            fileReader.readAsDataURL(fileToLoad);
        } else {
            editProduct(editForm.dataset.id, newName, newCategory, newDescription, newPrice)
        }
    })
}, 500)