import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://08-backend-coffee-production.up.railway.app/api';

const coffeeApi = axios.create({ baseURL });

coffeeApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers!['x-token'] = token;
  }
  return config;
});

export default coffeeApi;
