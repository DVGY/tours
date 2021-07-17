import axios from 'axios';
import { localStorageProxy } from './localStorageProxy';

const authtoken = localStorageProxy.getItem('authtoken');
axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`;
const token = () => (authtoken ? `Bearer ${authtoken}` : null);

const Axios = axios.create({
  withCredentials: true,
  // headers: {
  //   Authorization: token(),
  // },
});

export default Axios;
