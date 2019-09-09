import axios from 'axios';

const http = axios.create({
  baseURL: 'https://api.chucknorris.io/jokes',
});

export default http;
