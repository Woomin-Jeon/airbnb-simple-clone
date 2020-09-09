import { showByBlock, hide, move } from './util.js';

const $loginButton = document.getElementById('loginButton');
const $loginClose = document.getElementById('loginClose');
const $loginModal = document.getElementById('loginModal');
const $logoutButton = document.getElementById('logoutButton');
const $signupButton = document.getElementById('signupButton');
const $signupModal = document.getElementById('signupModal');
const $signupClose = document.getElementById('signupClose');
const $backgroundDark = document.getElementById('background-dark');

const darkBackgroundOnOff = (bool) => {
  $backgroundDark.style.display = bool ? 'block' : 'none';
};

$loginButton.addEventListener('click', () => {
  showByBlock($loginModal);
  darkBackgroundOnOff(true);
});
$signupButton.addEventListener('click', () => {
  showByBlock($signupModal);
  darkBackgroundOnOff(true);
});
$loginClose.addEventListener('click', () => {
  hide($loginModal);
  darkBackgroundOnOff(false);
});
$signupClose.addEventListener('click', () => {
  hide($signupModal);
  darkBackgroundOnOff(false);
});
$logoutButton.addEventListener('click', () => {
  move('/logout');
});
$backgroundDark.addEventListener('click', () => {
  [$backgroundDark, $loginModal, $signupModal].forEach((dom) => hide(dom));
});
