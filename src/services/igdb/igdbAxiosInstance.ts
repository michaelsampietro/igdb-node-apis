import axios from 'axios';
import { getToken } from './twitchAuth';

export const igdbAxiosInstance = axios.create({
  baseURL: `${process.env.IGDB_BASE_URL}/`,
  headers: {
    'Client-ID': `${process.env.TWITCH_CLIENT_ID}`,
    Authorization: `Bearer ${getToken()}`,
  }
});