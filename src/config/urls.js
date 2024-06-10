import {Platform} from 'react-native';

export let API_BASE_URL = '';

if (Platform.OS === 'android') {
  API_BASE_URL = 'http://89.116.32.31:9999';
  // API_BASE_URL = "http://10.0.2.2:3000"
} else {
  // API_BASE_URL = "http://localhost:3000"
  API_BASE_URL = 'http://89.116.32.31:9999';
}

export const getApiURL = endpoint => API_BASE_URL + endpoint;

// export const SIGNUP_API = getApiURL('/signup');
export const LOGIN_API = getApiURL('/login');
export const ORDER_API_ADMIN = getApiURL('/getallorders');
export const ORDER_API_USER = getApiURL('/getuserallorders/');
export const GET_SINGLE_ORDER = getApiURL('/getorderstatus/');
export const UPDATE_ORDER_STATUS = getApiURL('/updateorderstatus/');
export const DELETE_ORDER = getApiURL('/deleteorder/');
