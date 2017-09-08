
/**
 * HTMLDivELement
 */
const timer = document.getElementById('timer');
const date = document.getElementById('current-date');
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const today = new Date();

const initializeTime = () => {
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();
  const date = today.getDate();
  const day = today.getDay();

  updateDate(date,
     day);
  updateClock(hour, minute, second);
};

/**
* @param {number} hour
* @param {number} minute
* @param {number} second
*/
const updateClock = (hour, minute, second) => {
  timer.innerText = `${hour}:${minute}:${second}`;
};

const updateDate = (currentDate, day) => {
  date.innerText = `${days[day]}, ${currentDate}`;
};

setInterval(initializeTime, 1000);
initializeTime();

/**
 *
 * @param {HTMLElement} view
 * @param {{}} day
 */
const selectorDisplayView = (view, day, date, month) => {

    const weekDay = document.createElement('h5');
    weekDay.innerText = day;

    const weekDate = document.createElement('h6');
    console.log(month);
    weekDate.innerText = date + ' ' + months[month].substring(0, 3);

    const weekCircle = document.createElement('div');
    weekCircle.classList.add('weekCircle');
    weekCircle.appendChild(weekDay);
    weekCircle.appendChild(weekDate);

    view.appendChild(weekCircle);
  }

const selectorDisplay = () => {
  const week = document.getElementById('week-view');

  days.forEach((day, index) => {
    const dayIndex = (today.getDay() + index) % 7;
    const dateIndex = today.getDate() + index;
    const monthIndex = today.getMonth();

    const dayView = days[dayIndex]
    selectorDisplayView(week, dayView, dateIndex, monthIndex);
  });
}

selectorDisplay();

/**
 * HTMLInputElement
 */
const calendar = document.getElementById('calendar-picker');
calendar.setAttribute('value', today.toISOString().substring(0, 10));