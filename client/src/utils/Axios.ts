import axios from 'axios';

axios.defaults.baseURL = `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}`;

const Axios = axios.create({
  withCredentials: true,
});

export default Axios;
