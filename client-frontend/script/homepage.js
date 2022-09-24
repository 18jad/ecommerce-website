const chatEl = document.querySelector(".chat");
const chatPopupEl = document.querySelector(".chat-popup");
const closeEl = document.querySelector(".close");

chatEl.addEventListener("click", () => {
  chatPopupEl.classList.toggle("none");
});

closeEl.addEventListener("click", () => [chatPopupEl.classList.add("none")]);

let localStorageData = JSON.parse(localStorage.getItem("auth"));
console.log(localStorageData);
