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
  const filledCalendar = [...forwardEmptyDays, ...days];

  return splitByLegnth(filledCalendar, WEEK_NUMBER);
};

const renderCalendar = (dom, { year, month }, direction) => {
  const calendar = getCalender(year, month);

  dom.innerHTML = `
    <div class='calendar__header'>
      <div class='calendar__month__button' id='${direction}Calendar_privious_button'><</div>
      <div class='calendar__header__title'>${year}년 ${month}월</div>
      <div class='calendar__month__button' id='${direction}Calendar_next_button'>></div>
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

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

const calendarData = {
  left: {
    year: currentYear,
    month: currentMonth,
  },
  right: {
    year: currentYear,
    month: currentMonth + 1,
  },
};

const moveMonth = (prevOrNext, direction) => {
  const conditions = {
    next: {
      endOfYear: prevOrNext === 'next' && calendarData[direction].month === 12,
      middleOfYear: prevOrNext === 'next' && calendarData[direction].month < 12,
    },
    prev: {
      startOfYear: prevOrNext === 'prev' && calendarData[direction].month === 1,
      middleOfYear: prevOrNext === 'prev' && calendarData[direction].month > 1,
    },
  };

  if (conditions.next.endOfYear) {
    calendarData[direction].year += 1;
    calendarData[direction].month = 1;
    return;
  }

  if (conditions.next.middleOfYear) {
    calendarData[direction].month += 1;
    return;
  }

  if (conditions.prev.startOfYear) {
    calendarData[direction].year -= 1;
    calendarData[direction].month = 12;
    return;
  }

  if (conditions.prev.middleOfYear) {
    calendarData[direction].month -= 1;
  }
};

const handleMonthButton = ($button, $calendarLeft, $calendarRight, prevOrNext, direction) => {
  $button.addEventListener('click', () => {
    moveMonth(prevOrNext, direction);

    renderCalendar($calendarLeft, calendarData.left, 'left');
    renderCalendar($calendarRight, calendarData.right, 'right');
    connectEventListener($calendarLeft, $calendarRight);
  });
};

const connectEventListener = ($calendarLeft, $calendarRight) => {
  const $rightCalendarPriviousButton = document.getElementById('rightCalendar_privious_button');
  const $rightCalendarNextButton = document.getElementById('rightCalendar_next_button');
  const $leftCalendarPriviousButton = document.getElementById('leftCalendar_privious_button');
  const $leftCalendarNextButton = document.getElementById('leftCalendar_next_button');
  const $elements = document.getElementsByClassName('day');

  handleMonthButton($rightCalendarPriviousButton, $calendarLeft, $calendarRight, 'prev', 'right');
  handleMonthButton($rightCalendarNextButton, $calendarLeft, $calendarRight, 'next', 'right');
  handleMonthButton($leftCalendarPriviousButton, $calendarLeft, $calendarRight, 'prev', 'left');
  handleMonthButton($leftCalendarNextButton, $calendarLeft, $calendarRight, 'next', 'left');

  [...$elements].forEach((element) => {
    element.addEventListener('click', (event) => {
      event.target.classList.add('focus');
    });
  });
};

const $calendarLeft = document.getElementById('calendar_left');
const $calendarRight = document.getElementById('calendar_right');
renderCalendar($calendarLeft, calendarData.left, 'left');
renderCalendar($calendarRight, calendarData.right, 'right');
connectEventListener($calendarLeft, $calendarRight);
