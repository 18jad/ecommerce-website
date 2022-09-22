const chatEl = document.querySelector('.chat')
const chatPopupEl = document.querySelector('.chat-popup')
const close = document.querySelector('.close')
chatEl.addEventListener('click', () => {
    console.log("CLICKED");
    chatPopupEl.classList.toggle('none')

})