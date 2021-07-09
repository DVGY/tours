import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`;

const Axios = axios.create({
  withCredentials: true,
});

export default Axios;
