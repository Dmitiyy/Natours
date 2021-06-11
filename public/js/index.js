/* eslint-disable */

import '@babel/polyfill';
import {login, logout} from './login';
import {displayMap} from './mapbox';

if (document.querySelector('.form--login')) {
  document.querySelector('.form--login').addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.querySelector('input#email').value;
    const password = document.querySelector('input#password').value;

    login(email, password);
  });
}

if (document.querySelector('#map')) {
  const locations = JSON.parse(document.querySelector('#map').dataset.locations);
  displayMap(locations);
}

if (document.querySelector('.nav__el--logout')) {
  const btn = document.querySelector('.nav__el--logout');
  btn.addEventListener('click', logout);
}