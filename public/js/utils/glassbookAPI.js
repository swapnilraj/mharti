'use strict';

const BASE_URL = 'http://localhost:3000/v1/rooms/';

/**
 * API call to check availability of all rooms
 */
const checkAll = (credentials = '') => {
  const url = BASE_URL + 'all' + (credentials ? ('?credentials=' + credentials) : '');

  fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
};

/**
 * API call to check availability of a room
 * @param {number} room
 */
const checkRoom = (room, credentials = '') => {
  const url = BASE_URL + 'check' + '?room=' + room +
  (credentials ? ('&credentials=' + credentials) : '');

  fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
};

/**
 * API call to book rooms
 * @param {number} room
 * @param {string} credentials
 * @param {number} time
 * @param {number} date
 * @param {number} month
 * @param {number} year
 */
const bookRoom = (room, credentials, time, date, month, year) => {
  const url = BASE_URL + 'book' +
  '?room=' + room +
  '&credentials=' + credentials +
  '&time=' + time +
  '&date=' + date +
  '&month=' + month +
  '&year=' + year;

  fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
};