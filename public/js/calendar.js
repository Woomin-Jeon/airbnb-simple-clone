const WEEK_NUMBER = 7;
const MONTH_NUMBER = 12;
const DAY_NUMBER = 30;

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
  selectedDayIds: [],
};

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
        ${line.map((e) => `<td id='${year}-${month}-${e}' class='day'>${e || ''}</td>`).join('')}</tr>`).join('')}
    </table>
  `;

  const $days = document.getElementsByClassName('day');

  const currentDate = `${currentYear}-${currentMonth}-${new Date().getDate()}`;
  const currentTotalDay = getTotalDay(currentDate);

  const unusedPeriod = [...$days].filter((day) => {
    const targetTotalDay = getTotalDay(day.id);
    const targetDay = day.id.split('-')[2];

    return (targetTotalDay < currentTotalDay) || (targetDay === '0');
  });

  unusedPeriod.forEach((day) => {
    day.classList.add('unused');
  });

  const { selectedDayIds } = calendarData;

  if (!selectedDayIds.length === 0) {
    return;
  }

  if (selectedDayIds.length === 1) {
    const [selectedYear, selectedMonth] = selectedDayIds[0].split('-');

    if (selectedYear === year.toString() && selectedMonth === month.toString()) {
      const selectedDay = document.getElementById(selectedDayIds[0]);
      selectedDay.classList.add('focus');
    }
  }

  if (selectedDayIds.length === 2) {
    const [startDayId, endDayId] = selectedDayIds;

    const [selectedStartYear, selectedStartMonth] = startDayId.split('-');
    const [selectedEndYear, selectedEndMonth] = endDayId.split('-');

    if (selectedStartYear === year.toString() && selectedStartMonth === month.toString()) {
      const selectedDay = document.getElementById(startDayId);
      selectedDay.classList.add('focus');
    }

    if (selectedEndYear === year.toString() && selectedEndMonth === month.toString()) {
      const selectedDay = document.getElementById(endDayId);
      selectedDay.classList.add('focus');
    }

    const startTotalDay = getTotalDay(startDayId);
    const endTotalDay = getTotalDay(endDayId);

    const selectedPeriod = [...$days].filter((day) => {
      const targetTotalDay = getTotalDay(day.id);
      const targetDay = day.id.split('-')[2];

      return (targetTotalDay > startTotalDay && targetTotalDay < endTotalDay) && targetDay !== '0';
    });

    selectedPeriod.forEach((day) => {
      day.classList.add('active');
    });
  }
};

const getTotalDay = (targetDay) => {
  const [year, month, day] = targetDay.split('-').map((v) => Number(v));
  return (year * MONTH_NUMBER * DAY_NUMBER) + (month * DAY_NUMBER) + day;
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

const removeAdjacentDay = (targetDomId, selectedDayIds) => {
  const targetTotalDay = getTotalDay(targetDomId);
  const aTotalDay = getTotalDay(selectedDayIds[0]);
  const bTotalDay = getTotalDay(selectedDayIds[1]);

  const differenceBetweenAandTarget = Math.abs(targetTotalDay - aTotalDay);
  const differenceBetweenBandTarget = Math.abs(targetTotalDay - bTotalDay);

  if (differenceBetweenAandTarget > differenceBetweenBandTarget) {
    selectedDayIds.pop();
    return;
  }

  selectedDayIds.shift();
};

const handleMonthButton = ($button, $calendarLeft, $calendarRight, prevOrNext, direction) => {
  $button.addEventListener('click', () => {
    moveMonth(prevOrNext, direction);

    update($calendarLeft, $calendarRight);
  });
};

const handleDayButton = ($days) => {
  [...$days].forEach((day) => {
    day.addEventListener('click', (event) => {
      const { selectedDayIds } = calendarData;

      if (selectedDayIds.length === 2) {
        removeAdjacentDay(event.target.id, selectedDayIds);
      }

      selectedDayIds.push(event.target.id);
      selectedDayIds.sort((a, b) => getTotalDay(a) - getTotalDay(b));

      update($calendarLeft, $calendarRight);
    });
  });
};

const connectEventListener = ($calendarLeft, $calendarRight) => {
  const $rightCalendarPriviousButton = document.getElementById('rightCalendar_privious_button');
  const $rightCalendarNextButton = document.getElementById('rightCalendar_next_button');
  const $leftCalendarPriviousButton = document.getElementById('leftCalendar_privious_button');
  const $leftCalendarNextButton = document.getElementById('leftCalendar_next_button');
  const $days = document.getElementsByClassName('day');

  handleMonthButton($rightCalendarPriviousButton, $calendarLeft, $calendarRight, 'prev', 'right');
  handleMonthButton($rightCalendarNextButton, $calendarLeft, $calendarRight, 'next', 'right');
  handleMonthButton($leftCalendarPriviousButton, $calendarLeft, $calendarRight, 'prev', 'left');
  handleMonthButton($leftCalendarNextButton, $calendarLeft, $calendarRight, 'next', 'left');

  handleDayButton($days);
};

const update = ($calendarLeft, $calendarRight) => {
  renderCalendar($calendarLeft, calendarData.left, 'left');
  renderCalendar($calendarRight, calendarData.right, 'right');
  connectEventListener($calendarLeft, $calendarRight);
};

const $calendarLeft = document.getElementById('calendar_left');
const $calendarRight = document.getElementById('calendar_right');
update($calendarLeft, $calendarRight);
