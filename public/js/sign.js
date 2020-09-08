const $loginButton = document.getElementById('loginButton');
const $loginClose = document.getElementById('loginClose');
const $loginModal = document.getElementById('loginModal');
const $logoutButton = document.getElementById('logoutButton');
const $signupButton = document.getElementById('signupButton');
const $signupModal = document.getElementById('signupModal');
const $signupClose = document.getElementById('signupClose');
const $backgroundDark = document.getElementById('background-dark');

const move = (path) => {
  window.location.href = path;
};
const show = (dom) => {
  dom.style.display = 'block';
  $backgroundDark.style.display = 'block';
};
const hide = (dom) => {
  dom.style.display = 'none';
  $backgroundDark.style.display = 'none';
};

$loginButton.addEventListener('click', () => show($loginModal));
$signupButton.addEventListener('click', () => show($signupModal));
$loginClose.addEventListener('click', () => hide($loginModal));
$signupClose.addEventListener('click', () => hide($signupModal));
$logoutButton.addEventListener('click', () => move('/logout'));
$backgroundDark.addEventListener('click', () => {
  [$backgroundDark, $loginModal, $signupModal].forEach((dom) => hide(dom));
});
