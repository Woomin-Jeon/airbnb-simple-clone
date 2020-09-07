const $loginButton = document.getElementById('loginButton');
const $loginModal = document.getElementById('loginModal');
const $logoutButton = document.getElementById('logoutButton');
const $signupButton = document.getElementById('signupButton');
const $signupModal = document.getElementById('signupModal');
const $signupClose = document.getElementById('signupClose');
const $loginClose = document.getElementById('loginClose');

$loginClose.addEventListener('click', () => {
  $loginModal.style.display = 'none';
});

$signupClose.addEventListener('click', () => {
  $signupModal.style.display = 'none';
});

$loginButton.addEventListener('click', () => {
  $loginModal.style.display = 'block';
  $signupModal.style.display = 'none';
});

$logoutButton.addEventListener('click', () => {
  window.location.href = '/logout';
});

$signupButton.addEventListener('click', () => {
  $signupModal.style.display = 'block';
  $loginModal.style.display = 'none';
});