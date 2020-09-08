const $searchButton = document.getElementById('searchButton');
const $userButton = document.getElementById('userButton');
const $userButtonOn = document.getElementById('userButtonOn');
const $categoryLocation = document.getElementById('category-location');
const $categoryActivity = document.getElementById('category-activity');
const $reservationActivity = document.getElementById('reservation-activity');
const $reservationLocation = document.getElementById('reservation-location');

$categoryActivity.addEventListener('click', () => {
  $reservationLocation.style.display = 'none';
  $reservationActivity.style.display = 'flex';
  $categoryLocation.style.border = 'none';
  $categoryActivity.style.borderBottom = '3px solid black';
});

$categoryLocation.addEventListener('click', () => {
  $reservationLocation.style.display = 'flex';
  $reservationActivity.style.display = 'none';
  $categoryActivity.style.border = 'none';
  $categoryLocation.style.borderBottom = '3px solid black';
});

$userButton.addEventListener('click', () => {
  const targetCss = $userButtonOn.style;
  if (!targetCss.display || targetCss.display === 'none') {
    targetCss.display = 'block';
    return;
  }

  targetCss.display = 'none';
});

$searchButton.addEventListener('click', () => {
  alert('search!');
});
