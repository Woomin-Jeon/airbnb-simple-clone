const $loginButton = document.getElementById('loginButton');
const $loginModal = document.getElementById('loginModal');
const $logoutButton = document.getElementById('logoutButton');
const $signupButton = document.getElementById('signupButton');
const $signupModal = document.getElementById('signupModal');
const $signupClose = document.getElementById('signupClose');
const $loginClose = document.getElementById('loginClose');

const move = (path) => window.location.href = path;
const show = (dom) => dom.style.display = 'block';
const hidden = (dom) => dom.style.display = 'none';
const hiddenAndShow = (hiddenDom) => (showDom) => {
  hidden(hiddenDom);
  show(showDom);
};

$loginButton.addEventListener('click', () => hiddenAndShow($signupModal)($loginModal));
$signupButton.addEventListener('click', () => hiddenAndShow($loginModal)($signupModal));
$loginClose.addEventListener('click', () => hidden($loginModal));
$signupClose.addEventListener('click', () => hidden($signupModal));
$logoutButton.addEventListener('click', () => move('/logout'));
