import axios from "axios";
import fs from 'fs';
import { TwitchToken } from "../../types/twitchToken";


export function getToken() {
  const token = getTokenFromCache();

  if (token) {
    return token;
  }

  setTokenOnCache();
  return getTokenFromCache();
}

function getTokenFromCache(): string {
  const fileData = fs.readFileSync("src/db/twitchToken").toString();

  const [token, expirationDate] = fileData.split('###');

  if (expirationDate < Math.floor(new Date().getTime() / 1000).toString()) {
    return '';
  }

  return token;
}

async function setTokenOnCache() {
  const { access_token, expires_in } = await getTokenFromTwitch();
  const expirationDate = Math.floor(new Date().getTime() / 1000) + (expires_in);
  fs.writeFileSync("src/db/twitchToken", `${access_token}###${expirationDate}`);
  return access_token;
}

async function getTokenFromTwitch(): Promise<TwitchToken> {
  try {
    const { data } = await axios.post<TwitchToken>(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
    );

    return data;
  }
  catch (_) {
    throw new Error("Error fetching token from Twitch");
  }
}