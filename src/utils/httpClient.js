import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const setAuthToken = token => {
  AsyncStorage.setItem('token', token);
  console.log('Auth Token :', token);
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Authorization'] = `Basic ${token}`;
};