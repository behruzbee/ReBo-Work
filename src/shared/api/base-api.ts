import axios from 'axios';

// Замените 'localhost' на ваш IP-адрес
export const instance = axios.create({
  baseURL: 'http://45.138.158.146:3000' // ваш IP-адрес
});