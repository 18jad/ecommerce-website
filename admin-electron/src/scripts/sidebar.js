
/**
 * Navbar:
 *  - Close and open
 *  - Shrink buttons, links, logo
 */
const closeBarBtn = document.getElementById('closeNav'),
    navbar = document.querySelector('.nav-header'),
    linkTexts = document.querySelectorAll('.link-text'),
    links = document.querySelectorAll('.link'),
    logo = document.querySelector('.logo'),
    overviewBtn = document.querySelector('.overreview'),
    signOutBtn = document.getElementById('signOutBtn'),
    footerText = document.querySelector('.panelFooter');

closeBarBtn.addEventListener('click', () => {
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
})