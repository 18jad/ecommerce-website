
/**
 * Navbar:
 *  - Close and open
 *  - Shrink buttons, links, logo
 *  - Check if close
 */
const closeBarBtn = document.getElementById('closeNav'),
    navbar = document.querySelector('.nav-header'),
    linkTexts = document.querySelectorAll('.link-text'),
    links = document.querySelectorAll('.link'),
    logo = document.querySelector('.logo'),
    overviewBtn = document.querySelector('.overeview'),
    signOutBtn = document.getElementById('signOutBtn'),
    footerText = document.querySelector('.panelFooter');


// shrink nav and nav childs
const shrink = () => {
    navbar.classList.toggle('shrinked-nav');
    logo.classList.toggle('shrinked-logo');
    overviewBtn.classList.toggle('shrinked-btn');
    signOutBtn.classList.toggle('shrinked-btn');
    footerText.classList.toggle('shrinked-text');
    links.forEach(link => {
        link.classList.toggle('shrinked-link')
    })
    linkTexts.forEach(linkText => {
        linkText.classList.toggle('hide-text');
    })
}

// check if nav is closed when switching pages if yes keep it closed
if (localStorage.getItem('nav-status')) {
    if (localStorage.getItem('nav-status') != 'open') {
        shrink();
    }
}

// close nav by button
closeBarBtn.addEventListener('click', () => {
    if (navbar.classList.contains('shrinked-nav')) {
        closeBarBtn.style.transform = "rotate(0deg)";
        localStorage.setItem('nav-status', 'open');
    } else {
        closeBarBtn.style.transform = "rotate(180deg)";
        localStorage.setItem('nav-status', 'closed');
    }
    shrink();
})


/**
 * Modal:
 *  - Open and close modal
 */

const modalWrapper = document.querySelector('.modal'),
    modal = document.querySelector('.modal-container'),
    openModalBtn = document.querySelector('.open-modal'),
    closeModalBtn = document.querySelector('.closeModal');

const openModal = () => {
    modalWrapper.classList.add('show-modal');
    modal.classList.add('show-modal-content');
}

const closeModal = () => {
    modalWrapper.classList.remove('show-modal');
    modal.classList.remove('show-modal-content');
}

// open by button
openModalBtn.addEventListener('click', openModal);
// close by button
closeModalBtn.addEventListener('click', closeModal);
// close by clicking outside modal
modalWrapper.addEventListener('click', (e) => {
    if (!modal.contains(e.target)) {
        closeModal()
    }
});