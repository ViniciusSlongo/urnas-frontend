import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5058',
});

export default instance;
