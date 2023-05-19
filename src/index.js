const menuToggle = document.getElementById('menu-toggle');
const logoOpenMenu = document.querySelector('.logo');


menuToggle.addEventListener('click', onBtnToggleClass)
function onBtnToggleClass() {
    menuToggle.classList.toggle('open');
}