const $searchButton = document.getElementById('searchButton');
const $userButton = document.getElementById('userButton');
const $userButtonOn = document.getElementById('userButtonOn');

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
