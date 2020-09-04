const $loginButton = document.getElementById('loginButton');
const $loginModal = document.getElementById('loginModal');
const $logoutButton = document.getElementById('logoutButton');
const $signupButton = document.getElementById('signupButton');
const $signupModal = document.getElementById('signupModal');

$loginButton.addEventListener('click', () => {
  $loginModal.style.display = 'block';
});

$logoutButton.addEventListener('click', () => {
  window.location.href = '/logout';
});

$signupButton.addEventListener('click', () => {
  $signupModal.style.display = 'block';
});