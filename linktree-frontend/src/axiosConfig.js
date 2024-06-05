import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000' // Change this to your Rails server's URL
});

export default instance;
