/**
 * API response variables
 */
window.allRooms = {};
window.currentDate = {};
window.room = {};

const checkAllP = checkAll().then(data => window.allRooms = data);

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
 * @param {Object} day
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

    weekCircle.setAttribute('data-glass-day', day);
    weekCircle.setAttribute('data-glass-date', date);
    weekCircle.setAttribute('data-glass-month', month+1);
    weekCircle.setAttribute('data-glass-year', today.getFullYear());

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

const buttonGenerator = (time, isFuture, data) => {
  const button = document.createElement('div');
  button.classList.add('button');
  if(time < new Date().getHours() + 1 && !isFuture) {
    button.classList.add('muted')
  }

  button.setAttribute('data-glass-time', time);
  button.setAttribute('data-glass-date', data.date);
  button.setAttribute('data-glass-month', data.month);
  button.setAttribute('data-glass-year', data.year);

  button.innerText = `${time}:00-${time + 1}:00`;
  const placeholder = document.createElement('span');
  placeholder.classList.add('hide');

  button.appendChild(placeholder);
  return button;
};

const timeSlotsView = (data) => {
  const timeSlots = document.createElement('div');
  new Array(24).fill(0).forEach((_, index) => {
    timeSlots.appendChild(buttonGenerator(index, data.date > today.getDate(), data));
  });
  return timeSlots;
};

const generateRoomsView = (time, date, month, year) => {

  const bookedRooms = window
    .currentDate
    .map(booking => booking.room);

  const bookedTimes = window
    .currentDate
    .map(booking => (parseInt(booking.time.slice(0, 2))).toString());

  const matchingTime = bookedTimes.indexOf(time) > -1;

  const roomsView = document.createElement('div');
  roomsView.id = 'rooms-view';
  new Array(9).fill(0).forEach((_, index)=> {
    const roomNumber = index + 1;
    const isBooked = matchingTime && bookedRooms.indexOf(roomNumber) > -1;
    const room = document.createElement('div');
    room.classList.add('room', isBooked ? 'booked' : 'available');
    room.setAttribute('data-glass-room', roomNumber);
    room.setAttribute('data-glass-time', time);
    room.setAttribute('data-glass-date', date);
    room.setAttribute('data-glass-month', month);
    room.setAttribute('data-glass-year', year);

    room.innerText = index + 1;
    roomsView.appendChild(room)
  });

  return roomsView;
}

const injectRoomsView = (element) => {
  const getValue = element.getAttribute.bind(element);
  const time = getValue('data-glass-time');
  const date = getValue('data-glass-date');
  const month = getValue('data-glass-month');
  const year = getValue('data-glass-year');

  const roomsView = generateRoomsView(time, date, month, year);

  const currentView = element.firstElementChild;
  element.replaceChild(roomsView, currentView);
};

/**
 * Listen to clicks on time slots
 * @param {MouseEvent} event
 */
const handleRoom = (event) => {
  if (event.target.closest('div.room')) {
    event.preventDefault();
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');

    const credentials = btoa(`${username}:${password}`);
    const getValue = event.target.getAttribute.bind(event.target);
    const room = getValue('data-glass-room');
    const time = getValue('data-glass-time');
    const date = getValue('data-glass-date');
    const month = getValue('data-glass-month');
    const year = getValue('data-glass-year');

    bookRoom(room, credentials, time, date, month, year)
      .then(response => {
        alert(response.message);
      });
  }
};

/**
 *
 * @param {MouseEvent} event
 */
const handleWeek = (event) => {
  const weekDiv = event.target.closest('div.weekCircle');
  if (weekDiv) {
    const getValue = value => weekDiv.getAttribute(value);

    data = {
      date: getValue('data-glass-date'),
      month: getValue('data-glass-month'),
      year: getValue('data-glass-year'),
    };
    const key = `${data.date} ${months[data.month - 1].substring(0,3)} ${data.year}`

    checkAllP.then(() => {
        window.currentDate = window.allRooms[key] || [];
    });
    const timeSlots = timeSlotsView(data);
    const currentChild = timeView.firstElementChild;
    timeView.replaceChild(timeSlots, currentChild);
  }
};

/**
 *
 * @param {MouseEvent} event
 */
const handleTime = (event) => {
  if(event.target.matches('div.button') && !event.target.matches('div.muted')) {
    injectRoomsView(event.target);
  } else {
    handleRoom(event);
  }
};

setInterval(initializeTime, 1000);
initializeTime();
selectorDisplay();
/**
 * HTMLInputElement
 */
const calendar = document.getElementById('calendar-picker');
calendar.setAttribute('value', today.toISOString().substring(0, 10));

weekView.addEventListener('click', handleWeek);
timeView.addEventListener('click', handleTime);