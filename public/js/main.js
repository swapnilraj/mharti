
/**
 * HTMLDivELement
 */
const timer = document.getElementById('timer');
const date = document.getElementById('current-date');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const initializeTime = () => {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  const date = time.getDate();
  const day = time.getDay();

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

setInterval(initializeTime, 1000);
initializeTime();

/**
 *
 * @param {HTMLElement} view
 * @param {{}} day
 */
const selectorDisplayView = (view, day, date) => {

    const weekDay = document.createElement('h5');
    weekDay.innerText = day;

    const weekDate = document.createElement('h6');
    weekDate.innerText = date;

    const weekCircle = document.createElement('div');
    weekCircle.classList.add('weekCircle');
    weekCircle.appendChild(weekDay);
    weekCircle.appendChild(weekDate);

    view.appendChild(weekCircle);
  }

const selectorDisplay = () => {
  const week = document.getElementById('week-view');
  const date = new Date();

  days.forEach((day, index) => {
    const dayIndex = (date.getDay() + index) % 7;
    const dateIndex = date.getDate() + index;
    const dayView = days[dayIndex]
    selectorDisplayView(week, dayView, dateIndex );
  });
}

selectorDisplay();

/**
 * HTMLInputElement
 */
const calendar = document.getElementById('calendar-picker');
calendar.setAttribute('value', new Date().toISOString().substring(0, 10));