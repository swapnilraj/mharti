
/**
 * HTMLDivELement
 */
const timer = document.getElementById('timer');
const date = document.getElementById('current-date');
const weekView = document.getElementById('week-view');
const timeView = document.getElementById('time-view');
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
  const currentTime = new Date();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();
  const date = currentTime.getDate();
  const day = currentTime.getDay();

  updateDate(date, day);
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

/**
 *
 * @param {HTMLElement} view
 * @param {{}} day
 */
const selectorDisplayView = (view, day, date, month) => {

    const weekDay = document.createElement('h5');
    weekDay.innerText = day;

    const weekDate = document.createElement('h6');
    weekDate.innerText = date + ' ' + months[month].substring(0, 3);

    const weekCircle = document.createElement('div');
    weekCircle.classList.add('weekCircle');
    weekCircle.appendChild(weekDay);
    weekCircle.appendChild(weekDate);

    view.appendChild(weekCircle);
  }

const selectorDisplay = () => {
  days.forEach((day, index) => {
    const dayIndex = (today.getDay() + index) % 7;
    const dateIndex = today.getDate() + index;
    const monthIndex = today.getMonth();

    const dayView = days[dayIndex]
    selectorDisplayView(weekView, dayView, dateIndex, monthIndex);
  });
}

const buttonGenerator = (time, isFuture) => {
  const button = document.createElement('div');
  button.classList.add('button');
  if(time < new Date().getHours() + 1 && !isFuture) {
    button.classList.add('muted')
  }

  const timeSlot = document.createElement('p');
  timeSlot.innerText = `${time}:00 - ${time + 1}:00`;

  button.appendChild(timeSlot);
  return button;
};

const timeSlotsView = (date) => {
  const date_ = date.split(' ')[0];
  new Array(24).fill(0).forEach((_, index) => {
    timeView.appendChild(buttonGenerator(index, date_ > today.getDate()));
  });
};

/**
 *
 * @param {MouseEvent} event
 */
const handleWeek = (event) => {
  if (event.target.matches('div.weekCircle')) {
    timeSlotsView(event.target.querySelector('h6').innerText);
  }
}



/**
 * HTMLInputElement
 */
const calendar = document.getElementById('calendar-picker');
calendar.setAttribute('value', today.toISOString().substring(0, 10));

selectorDisplay();

weekView.addEventListener('click', handleWeek);

setInterval(initializeTime, 1000);
initializeTime();