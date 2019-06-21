import Logger from "js-logger";
import axios, { AxiosInstance } from "axios";

const requestTimeout = 15000;

/*************************************************/
/* API SETUP */
/*************************************************/
const requestJokesApi: AxiosInstance = axios.create({
  baseURL: `https://api.icndb.com`,
  timeout: requestTimeout,
  headers: {
    "Content-Type": "application/json"
  }
});

/*************************************************/
/* REQUEST METHODS */
/*************************************************/
function getJokesRequest(jokeCount: number) {
  return requestJokesApi.get(`/jokes/random/${jokeCount}`);
}

/*************************************************/
/* EXTERNAL METHODS */
/*************************************************/
export function getJokes(jokeCount: number = 10) {
  return getJokesRequest(jokeCount).then((response) => {
    Logger.info("getJokesRequest response: ", response);
    return response.data;
  }).catch((error) => {
    return error;
  });
}
