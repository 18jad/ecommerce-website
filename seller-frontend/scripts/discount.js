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
                    <p class="discount-id">#1${discountCode.id}</p>
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


const createNewDiscount = (sellerID, percentage) => {
    const _URL = "http://localhost/ecommerce-website/ecommerce-server/discount_create.php";
    const result = document.getElementById("responseResult");
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