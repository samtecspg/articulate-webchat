import axios from 'axios';

export function postConverse(url, payload) {
  return axios.post(url, payload);
};