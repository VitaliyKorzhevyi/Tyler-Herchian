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

const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.querySelector('.backdrop-menu');
const bodyScrollLock = document.querySelector('body');
const itemMenu = document.querySelectorAll('.item-menu-closes');

const servicesList = document.querySelector('.services-list');
const servicesLines = document.querySelectorAll('.services-lines span');

const input = document.getElementById('forName');
const validationMessage = document.getElementById('validationMessage');
const emailInput = document.getElementById('forEmail');
const emailValidationMessage = document.getElementById(
  'emailValidationMessage'
);
const messageInput = document.getElementById('formMessage');
const messageValidationMessage = document.getElementById(
  'messageValidationMessage'
);

// отправка, проверка формы и ответ
const handlerForm = e => {
  e.preventDefault();
  const username = forName.value.trim();
  const email = forEmail.value.trim();
  const message = formMessage.value.trim();

  // Проверяем, являются ли поля пустыми
  if (!username || !email || !message) {
    Notiflix.Notify.warning('Please fill in all fields.');
    return; // Прекращаем выполнение функции, если есть пустые поля
  }

  const formData = {
    username: username,
    email: email,
    message: message,
  };

  console.log(formData, 'formData');

  fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => {
      if (response.status === 422) {
        throw new Error(422);
      }

      if (response.status === 429) {
        throw new Error(429);
      }

      if (!response.ok) {
        throw new Error('Error response');
      }
      console.log(response);
      return response.json();
    })
    .then(data => {
      Notiflix.Notify.success('Your message has been sent!');

      // Очищаем значения полей формы после успешной отправки
      forName.value = '';
      forEmail.value = '';
      formMessage.value = '';
    })
    .catch(error => {
      if (error.message === 422) {
        Notiflix.Notify.warning('Invalid date');
      } else if (error.message === 429) {
        Notiflix.Notify.warning('Please try again in 1 minute');
      } else {
        Notiflix.Notify.warning('Please try again later');
      }
    });
};
submitButton.addEventListener('click', handlerForm);


// --------------- кнопка открытия и закрытия мобильного меню
menuToggle.addEventListener('click', onBtnToggleClass);
function onBtnToggleClass() {
  menuToggle.classList.toggle('open');
  mobileMenu.classList.toggle('is-open');
  bodyScrollLock.classList.toggle('no-scroll');
}

itemMenu.forEach(itemMenu => {
  itemMenu.addEventListener('click', onBtnToggleClass);
});


// ---------------- горизонтальный скрол
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


//------------- валидация инпутов
input.addEventListener('input', function () {
  validateInput(input, validationMessage, 3);
});

messageInput.addEventListener('input', function () {
  validateInput(messageInput, messageValidationMessage, 10);
});

function validateInput(input, validationMessage, minLength) {
  const inputValue = input.value;
  if (inputValue.length < minLength) {
    validationMessage.textContent = `Min. ${minLength} characters`;
  } else {
    validationMessage.textContent = '';
  }

  if (inputValue.length === 0) {
    validationMessage.textContent = '';
  }
}


emailInput.addEventListener('input', function () {
  const emailValue = emailInput.value;
  if (emailValue.length === 0) {
    emailValidationMessage.textContent = '';
  } else if (!validateEmail(emailValue)) {
    emailValidationMessage.textContent = 'Invalid email format';
  } else {
    emailValidationMessage.textContent = '';
  }
});

function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}
