import throttle from 'lodash/throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[type="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const savedData = localStorage.getItem('feedback-form-state');
const parsedData = JSON.parse(savedData);

function localStorageCheck() {
  if (localStorage.getItem('feedback-form-state')) {
    emailInput.value = parsedData.email;
    messageInput.value = parsedData.message;
  }
  return;
}

localStorageCheck();

form.addEventListener('input', throttle(localStorageFn, 500));

const dataObj = {};

function localStorageFn() {
  dataObj[emailInput.name] = emailInput.value;
  dataObj[messageInput.name] = messageInput.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(dataObj));
}

form.addEventListener('submit', onFormClear);

function onFormClear(evt) {
  evt.preventDefault();
  emailInput.value = '';
  messageInput.value = '';
  localStorage.removeItem('feedback-form-state');
}
