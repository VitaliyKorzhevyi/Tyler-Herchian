const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.querySelector('.backdrop-menu');
const bodyScrollLock = document.querySelector('body');


menuToggle.addEventListener('click', onBtnToggleClass)
function onBtnToggleClass() {
    menuToggle.classList.toggle('open');
    mobileMenu.classList.toggle('is-open');
    bodyScrollLock.classList.toggle('no-scroll');
}