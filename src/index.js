const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.querySelector('.backdrop-menu');
const bodyScrollLock = document.querySelector('body');


menuToggle.addEventListener('click', onBtnToggleClass)
function onBtnToggleClass() {
    menuToggle.classList.toggle('open');
    mobileMenu.classList.toggle('is-open');
    bodyScrollLock.classList.toggle('no-scroll');
}

const servicesList = document.querySelector('.services-list');
const servicesLines = document.querySelectorAll('.services-lines span');

servicesList.addEventListener('scroll', updateLinesHeight);
window.addEventListener('load', updateLinesHeight);

function updateLinesHeight() {
  const scrollLeft = servicesList.scrollLeft;
  const imageWidth = 245;
  const gap = 30;
  const lineHeight = 2;

  const imageIndex = Math.floor((scrollLeft + gap / 2) / (imageWidth + gap));
  const lineIndex = Math.max(0, Math.min(3, imageIndex));

  servicesLines.forEach((line, index) => {
    if (index === lineIndex) {
      line.style.height = `${lineHeight}px`;
    } else {
      line.style.height = `1px`;
    }
  });
}
  