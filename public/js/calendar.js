const WEEK_NUMBER = 7;

const checkIsLeapYear = (year) => new Date(year, 1, 29).getDate() === 29;

const getMonthes = (year) => (checkIsLeapYear(year)
  ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]);

const getDays = (monthes, month) => Array(monthes[month - 1]).fill().map((_, i) => i + 1);

const getDayOfWeek = (date) => new Date(date).getDay();

const splitByLegnth = (arr, length) => arr.reduce((acc, cur, index) => {
  acc.tempt = [...acc.tempt, cur];

  return (index + 1) % length === 0 || (index + 1) === arr.length
    ? { result: [...acc.result, acc.tempt], tempt: [] }
    : { result: acc.result, tempt: acc.tempt };
}, { result: [], tempt: [] }).result;

const getCalender = (year, month) => {
  const monthes = getMonthes(year);
  const days = getDays(monthes, month);
  const firstDayOfWeek = getDayOfWeek(`${year}-${month}-1`);

  const forwardEmptyDays = Array(firstDayOfWeek).fill(0);
  const backwardEmptyDays = Array((days.length - firstDayOfWeek + 1) % WEEK_NUMBER).fill(0);
  const filledCalendar = [...forwardEmptyDays, ...days, ...backwardEmptyDays];

  return splitByLegnth(filledCalendar, WEEK_NUMBER);
};

getCalender(2020, 10);

const renderCalendar = (dom, year, month, direction) => {
  const calendar = getCalender(year, month);

  dom.innerHTML = `
    <div class='calendar__header'>
      <div id='${direction}Calendar_privious_button'><</div>
      <div class='calendar__header__title'>${year}년 ${month}월</div>
      <div id='${direction}Calendar_next_button'>></div>
    </div>
    <div class='day__of__week'>
      <span class='day__of__week__text'>일</span>
      <span class='day__of__week__text'>월</span>
      <span class='day__of__week__text'>화</span>
      <span class='day__of__week__text'>수</span>
      <span class='day__of__week__text'>목</span>
      <span class='day__of__week__text'>금</span>
      <span class='day__of__week__text'>토</span>
    </div>
    <table>
      ${calendar.map((line) => `<tr>
        ${line.map((e) => `<td class='day'>${e || ''}</td>`).join('')}</tr>`).join('')}
    </table>
  `;
};

const $calendarLeft = document.getElementById('calendar_left');
const $calendarRight = document.getElementById('calendar_right');
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

let rightYear = currentYear;
let rightMonth = currentMonth + 1;

renderCalendar($calendarLeft, currentYear, currentMonth, 'left');
renderCalendar($calendarRight, rightYear, rightMonth, 'right');

const $rightCalendarPriviousButton = document.getElementById('rightCalendar_privious_button');
const $rightCalendarNextButton = document.getElementById('rightCalendar_next_button');

$rightCalendarPriviousButton.addEventListener('click', () => {
  if (rightMonth === 1) {
    rightYear -= 1;
    rightMonth = 12;
  } else {
    rightMonth -= 1;
  }

  renderCalendar($calendarRight, rightYear, rightMonth, 'right');
});

$rightCalendarNextButton.addEventListener('click', () => {
  if (rightMonth === 12) {
    rightYear += 1;
    rightMonth = 1;
  } else {
    rightMonth += 1;
  }

  renderCalendar($calendarRight, rightYear, rightMonth, 'right');
});

const $elements = document.getElementsByClassName('day');

[...$elements].forEach((element) => {
  element.addEventListener('click', (event) => {
    event.target.classList.add('focus');
  });
});
