(() => {
    const discountTable = document.querySelector('.products-table');

    const _URL = "http://localhost/ecommerce-website/ecommerce-server/seller_discounts.php";
    axios({
        method: "POST",
        url: _URL,
        data: {
            sellerId: localStorage.getItem('seller_id'),
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        let discountCodes = response.data;
        discountCodes.forEach((discountCode) => {
            let discountHTML = `
                <div class="discount">
                    <p class="discount-id">#${discountCode.id}</p>
                    <p class="discount-code">${discountCode.code}</p>
                    <p class="discount-percentage">${discountCode.percentage}%</p>
                    <button class="deleteBtn" data-id=${discountCode.id}>
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                `
            discountTable.innerHTML += discountHTML;
        })
    }).catch((error) => {
        console.log(error);
    })
})();

const result = document.getElementById("responseResult");

const createNewDiscount = (sellerID, percentage) => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/discount_create.php";
    axios({
        method: "POST",
        url: _URL,
        data: {
            seller_id: sellerID,
            percentage,
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        result.textContent = `Discount code ${response.data} successfully generated`
        result.hidden = false;
        setTimeout(() => {
            result.hidden = true;
        }, 2000)
    }).catch((error) => {
        console.log(error);
    })
}


const percentageInput = document.querySelector('.percentage-input'),
    discountForm = document.querySelector('.discount-container');

discountForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("test")
    let percentage = percentageInput.value,
        sellerID = localStorage.getItem('seller_id');

    createNewDiscount(sellerID, percentage);
})


const deleteDiscount = (discountID) => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/discount_delete.php";
    axios({
        method: "POST",
        url: _URL,
        data: {
            discount_id: discountID,
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
        // success
        result.textContent = `Discount ${discountID} deleted`;
        result.hidden = false;
        setTimeout(() => {
            result.hidden = true;
            window.location.reload();
        }, 1500);
    }).catch((error) => {
        console.log(error)
    });
}

// delete discount code  by button

setTimeout(() => {
    const deleteBtns = document.querySelectorAll('.deleteBtn');
    deleteBtns.forEach((btns) => {
        btns.addEventListener('click', () => {
            deleteDiscount(btns.dataset.id);
        })
    })
}, 200);

// delete discount code by user input
const idInput = document.querySelector('.discountIdInput'),
    idForm = document.getElementById('discount-id-form');

idForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let id = idInput.value;
    deleteDiscount(id);
})