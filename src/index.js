import Notiflix from 'notiflix';


import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
  delay: 0,
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
});

const forName = document.querySelector('#forName');
const forEmail = document.querySelector('#forEmail');
const formMessage = document.querySelector('#formMessage');
const submitButton = document.querySelector('#submitForm');

const handlerForm = e => {
  e.preventDefault();
  const formData = {
    username: forName.value.trim(),
    email: forEmail.value.trim(),
    message: formMessage.value.trim(),
  };

  console.log(formData, 'formdat');

  fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error repons');
      }
      console.log(response);
      return response.json();
    })
    .then(data => {
      Notiflix.Notify.success('Your message has been sent!');
    })
    .catch(error => {
      Notiflix.Notify.warning('Invalid data.');
    });
  forName.value = '';
  forEmail.value = '';
  formMessage.value = '';
};
submitButton.addEventListener('click', handlerForm);

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.querySelector('.backdrop-menu');
const bodyScrollLock = document.querySelector('body');

menuToggle.addEventListener('click', onBtnToggleClass);
function onBtnToggleClass() {
  menuToggle.classList.toggle('open');
  mobileMenu.classList.toggle('is-open');
  bodyScrollLock.classList.toggle('no-scroll');
}

const itemMenu = document.querySelectorAll('.item-menu-closes');

itemMenu.forEach(itemMenu => {
  itemMenu.addEventListener('click', onBtnToggleClass);
});

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

window.matchMedia('(min-width: 320px)').addEventListener('change', e => {
  if (!e.matches) return;
  mobileMenu.classList.remove('is-open');
  openMenuBtn.setAttribute('aria-expanded', false);
  bodyScrollLock.classList.remove('no-scroll');
});
