const menuToggle = document.getElementById('menu-toggle');
const logoOpenMenu = document.querySelector('.logo');
const bodyScrollLock = document.querySelector('body');


menuToggle.addEventListener('click', onBtnToggleClass)
function onBtnToggleClass() {
    menuToggle.classList.toggle('open');
    bodyScrollLock.classList.toggle('no-scroll');
}