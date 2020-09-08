const $searchButton = document.getElementById('searchButton');
const $userButton = document.getElementById('userButton');
const $userButtonOn = document.getElementById('userButtonOn');
const $categoryLocation = document.getElementById('category-location');
const $categoryActivity = document.getElementById('category-activity');
const $reservationActivity = document.getElementById('reservation-activity');
const $reservationLocation = document.getElementById('reservation-location');

const showByFlex = (dom) => {
  dom.style.display = 'flex';
};
const showByBlock = (dom) => {
  dom.style.display = 'block';
};
const hide = (dom) => {
  dom.style.display = 'none';
};
const activate = (dom) => {
  dom.style.borderBottom = '3px solid black';
};
const deactivate = (dom) => {
  dom.style.borderBottom = 'none';
};

$categoryActivity.addEventListener('click', () => {
  showByFlex($reservationActivity);
  hide($reservationLocation);
  activate($categoryActivity);
  deactivate($categoryLocation);
});
$categoryLocation.addEventListener('click', () => {
  showByFlex($reservationLocation);
  hide($reservationActivity);
  activate($categoryLocation);
  deactivate($categoryActivity);
});
$userButton.addEventListener('click', () => {
  const targetAttribute = $userButtonOn.style.display;
  if (!targetAttribute || targetAttribute === 'none') {
    showByBlock($userButtonOn);
    return;
  }

  hide($userButtonOn);
});
$searchButton.addEventListener('click', () => {
  alert('search!');
});
