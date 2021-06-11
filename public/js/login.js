/* eslint-disable */

import axios from 'axios';
import {showAlert} from './alerts';

export const login = async (email, password) => {
  try {
    const response = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {email, password},
      withCredentials: true
    });

    if (response.status === 200) {
      const token = response.data.token;
      localStorage.setItem('jwt', token);
      document.cookie = `jwt=${token} ; expires=Sun, 1 Jan 2023 00:00:00 UTC; path=/`;
      showAlert('success', 'logged in successfully');
      setTimeout(() => {location.assign('/')}, 1500);
    }

    return response;
  } catch (e) {showAlert('error', 'logged in failure')}
}

export const logout = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    })
    if (response.status === 200) location.reload(true)
  } catch (err) {
    console.log(err);
    showAlert('error', 'fail')
  }
}

