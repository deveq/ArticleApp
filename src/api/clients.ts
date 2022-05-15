import axios from 'axios';
import {Platform} from 'react-native';
//  __DEV__ 값을 통해 현재 환경이 개발 환경인지 아닌지 판단할 수 있다
const baseURL = __DEV__
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:1337'
    : 'http://localhost:1337'
  : 'https://articles.example.com';

const client = axios.create({
  baseURL,
});

export function applyToken(jwt: string) {
  client.defaults.headers.common.Authorization = `Bearer ${jwt}`;
  // client.defaults.headers.Authorization = `Bearer ${jwt}`;
}

export function clearToken() {
  delete client.defaults.headers.common.Authorization;
}

export default client;
