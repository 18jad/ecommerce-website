const chatEl = document.querySelector(".chat");
const chatPopupEl = document.querySelector(".chat-popup");
const closeEl = document.querySelector(".close");
const userAmountEl = document.querySelector(".user-amount");
const searchDataEl = document.querySelector(".search-data");
const searchOutputEl = document.querySelector(".search-output");

chatEl.addEventListener("click", () => {
  chatPopupEl.classList.toggle("none");
});

closeEl.addEventListener("click", () => [chatPopupEl.classList.add("none")]);

let localStorageData = JSON.parse(localStorage.getItem("auth"));
// console.log(localStorageData[1]);

axios({
  method: "POST",
  url: "http://localhost/jacht/authorized.php",
  data: {
    userName: localStorageData[1],
    token: localStorageData[2],
  },
  headers: { "Content-Type": "multipart/form-data" },
})
  .then(function (response) {
    //handle success
    if (response.data === true) {
      fetchingAllData();
    } else {
      localStorage.clear();
      window.location.href = "login.html";
    }
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });

const fetchingAllData = () => {
  // console.log(localStorageData[0]);

  axios({
    method: "POST",
    url: "http://localhost/jacht/client_navbar.php",
    data: {
      user_id: localStorageData[0],
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      // console.log(response.data);
      userAmountEl.textContent = `${response.data[0]["money"]}$`;
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
};

searchDataEl.addEventListener("keyup", () => {
  searchOutputEl.classList.remove("none");
  axios({
    method: "POST",
    url: "http://localhost/jacht/client_search.php",
    data: {
      searchQuery: searchDataEl.value,
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      //handle success
      // console.log(response.data[0]["id"]);

      searchOutputEl.innerHTML = "";
      for (let i = 0; i < response.data.length; i++) {
        let serchOutput = `
        <a id="${response.data[i]["id"]}" href="" class="search-output-output"
            <h1>${response.data[i]["name"]}</h1>
            <p>${response.data[i]["price"]}</p>
        </a>`;
        searchOutputEl.innerHTML += serchOutput;
      }
    })

    .catch(function (response) {
      //handle error
      console.log(response);
    });
});
