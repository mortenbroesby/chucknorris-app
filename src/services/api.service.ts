import axios, { AxiosInstance } from "axios";
import config from "../config";

import { JokeCollectionModel } from "../models/jokeCollection.model";

/*************************************************/
/* API SETUP */
/*************************************************/
const requestJokesApi: AxiosInstance = axios.create({
  baseURL: `https://api.icndb.com`,
  timeout: config.api.requestTimeout,
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
    return new JokeCollectionModel(response.data);
  }).catch((error) => {
    return error;
  });
}
