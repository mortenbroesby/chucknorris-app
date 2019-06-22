import Logger from "js-logger";
import { ActionContext, MutationTree, GetterTree } from "vuex";
import { RootState } from "../store";
import { createDispatcher, ModuleDispatcher } from "./utilities";
import { setItem, getItem, removeItem } from "../utilities";

import { JokeCollectionModel } from "../models/jokeCollection.model";
import { getJokes } from "../services/api.service";
import { JokeModel } from "../models/joke.model";

export const jokesNamespace = "jokeModule";
type JokesContext = ActionContext<JokesState, RootState>;

const COUNT_FAVORITES_LIMIT = 10;
const COUNT_JOKES_TO_FETCH_TO_STOREFRONT = 10;
const COUNT_JOKES_TO_FETCH_TO_CACHE = 20;
const COUNT_REFRESH_INTERVAL_IN_SECONDS = 5;

export interface JokesState {
  jokeCollection: JokeCollectionModel;
  favorites: JokeCollectionModel;
  cache: JokeCollectionModel;
  autoIntervalActive: boolean;
}

const state: JokesState = ({
  jokeCollection: new JokeCollectionModel(),
  favorites: new JokeCollectionModel(),
  cache: new JokeCollectionModel(),
  autoIntervalActive: false,
});

export enum JokesMutations {
  SET_COLLECTION = "SET_COLLECTION",
  RESET_COLLECTION = "RESET_COLLECTION",
  ADD_TO_COLLECTION = "ADD_TO_COLLECTION",
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES",
  SET_FAVORITES = "SET_FAVORITES",
  RESET_FAVORITES = "RESET_FAVORITES",
  SET_CACHE = "SET_CACHE",
  SET_AUTO_INTERVAL_ACTIVE = "SET_AUTO_INTERVAL_ACTIVE",
}

let autoIntervalActiveInterval = -1;

const mutations: MutationTree<JokesState> = {
  [JokesMutations.SET_COLLECTION](prevState: JokesState, jokeCollection: JokeCollectionModel) {
    prevState.jokeCollection = jokeCollection;
  },
  [JokesMutations.RESET_COLLECTION](prevState: JokesState) {
    prevState.jokeCollection = new JokeCollectionModel();
  },
  [JokesMutations.ADD_TO_COLLECTION](prevState: JokesState, joke: JokeModel) {
    const jokeExists = prevState.favorites.jokes.find((collectionJoke: JokeModel) => collectionJoke.id == joke.id);
    if (!jokeExists) {
      prevState.jokeCollection.jokes.push(joke);
    }
  },
  [JokesMutations.ADD_TO_FAVORITES](prevState: JokesState, joke: JokeModel) {
    const favoriteExists = prevState.favorites.jokes.find((favorite: JokeModel) => favorite.id == joke.id);
    if (!favoriteExists && prevState.favorites.jokes.length < COUNT_FAVORITES_LIMIT) {
      prevState.favorites.jokes.push(joke);
      prevState.jokeCollection.jokes = prevState.jokeCollection.jokes.filter(collectionItem => collectionItem.id !== joke.id);
      setItem("userFavoriteJokes", prevState.favorites);
    } else {
      alert(`You've reached your limit of ${COUNT_FAVORITES_LIMIT} jokes.`);
    }
  },
  [JokesMutations.REMOVE_FROM_FAVORITES](prevState: JokesState, joke: JokeModel) {
    prevState.favorites.jokes = prevState.favorites.jokes.filter(favorite => favorite.id !== joke.id);
    setItem("userFavoriteJokes", prevState.favorites);
  },
  [JokesMutations.SET_FAVORITES](prevState: JokesState, jokeCollection: JokeCollectionModel) {
    prevState.favorites = jokeCollection;
    setItem("userFavoriteJokes", jokeCollection);
  },
  [JokesMutations.RESET_FAVORITES](prevState: JokesState) {
    prevState.favorites = new JokeCollectionModel();
    removeItem("userFavoriteJokes");
  },
  [JokesMutations.SET_CACHE](prevState: JokesState, cacheCollection: JokeCollectionModel) {
    prevState.cache = cacheCollection;
  },
  [JokesMutations.SET_AUTO_INTERVAL_ACTIVE](prevState: JokesState, isActive: boolean) {
    prevState.autoIntervalActive = isActive;

    if (isActive) {
      window.clearInterval(autoIntervalActiveInterval);
      autoIntervalActiveInterval = window.setInterval(() => {
        if (state.favorites.jokes.length >= COUNT_FAVORITES_LIMIT) return;

        $jokesModule.dispatch("getFromCache", 1).then((cache: JokeCollectionModel) => {
          if (cache.jokes.length > 0) {
            $jokesModule.dispatch("addToFavorites", cache.jokes[0]);
          }
        });
      }, (COUNT_REFRESH_INTERVAL_IN_SECONDS * 1000));
    } else {
      window.clearInterval(autoIntervalActiveInterval);
    }
  },
};

type Actions = typeof actions;

const actions = {
  initialise({ commit }: JokesContext) {
    $jokesModule.dispatch("refreshCache");

    const savedFavorites = getItem("userFavoriteJokes");
    if (savedFavorites) {
      commit(JokesMutations.SET_FAVORITES, savedFavorites);
    }
  },
  refreshCache({ commit, state }: JokesContext) {
    if (state.cache.jokes.length > COUNT_JOKES_TO_FETCH_TO_STOREFRONT) return;

    getJokes(COUNT_JOKES_TO_FETCH_TO_CACHE).then((jokeCollection: JokeCollectionModel) => {
      commit(JokesMutations.SET_CACHE, jokeCollection);
    }).catch((error) => {
      Logger.error("getJokes error: ", error);
    });
  },
  getFromCache({ dispatch, commit, state }: JokesContext, jokeCount: number): JokeCollectionModel {
    // Grab jokes from cache
    const slicedCollectionFromCache: JokeCollectionModel = {
      jokes: state.cache.jokes.slice(0, jokeCount)
    };

    // Filter out jokes taken from cache
    slicedCollectionFromCache.jokes.forEach(tempCache => {
      state.cache.jokes = state.cache.jokes.filter(cacheItem => cacheItem.id !== tempCache.id);
    });

    // Store cached jokes in collection
    if (state.cache.jokes.length < COUNT_JOKES_TO_FETCH_TO_STOREFRONT) {
      dispatch("refreshCache");
    }

    return slicedCollectionFromCache;
  },
  getJokes({ commit }: JokesContext) {
    $jokesModule.dispatch("getFromCache", COUNT_JOKES_TO_FETCH_TO_STOREFRONT).then((cache: JokeCollectionModel) => {
      // Store cached jokes in collection
      if (cache.jokes.length > 0) {
        commit(JokesMutations.SET_COLLECTION, cache);
      } else {
        // Fallback to manually fetching jokes
        getJokes(COUNT_JOKES_TO_FETCH_TO_STOREFRONT).then((jokeCollection: JokeCollectionModel) => {
          commit(JokesMutations.SET_COLLECTION, jokeCollection);
        }).catch((error) => {
          Logger.error("getJokes error: ", error);
        });
      }
    });
  },
  resetJokesCollection({ commit }: JokesContext) {
    commit(JokesMutations.RESET_COLLECTION);
  },
  addToFavorites({ commit, state }: JokesContext, joke: JokeModel) {
    const favoriteExists = state.favorites.jokes.find((favorite: JokeModel) => favorite.id == joke.id);
    if (!favoriteExists && state.favorites.jokes.length < COUNT_FAVORITES_LIMIT) {
      commit(JokesMutations.ADD_TO_FAVORITES, joke);

      // Add new joke to joke-collection from cache
      $jokesModule.dispatch("getFromCache", 1).then((cache: JokeCollectionModel) => {
        if (cache.jokes.length > 0) {
          commit(JokesMutations.ADD_TO_COLLECTION, cache.jokes[0]);
        }
      });
    } else {
      alert(`You've reached your limit of ${COUNT_FAVORITES_LIMIT} jokes.`);
    }
  },
  removeFromFavorites({ commit }: JokesContext, joke: JokeModel) {
    commit(JokesMutations.REMOVE_FROM_FAVORITES, joke);
  },
  setFavorites({ commit }: JokesContext, jokeCollection: JokeCollectionModel) {
    commit(JokesMutations.SET_FAVORITES, jokeCollection);
  },
  resetFavorites({ commit }: JokesContext, jokeCollection: JokeCollectionModel) {
    commit(JokesMutations.RESET_FAVORITES);
  },
  setAutoIntervalActive({ commit }: JokesContext, isActive: boolean) {
    commit(JokesMutations.SET_AUTO_INTERVAL_ACTIVE, isActive);
  },
  toggleAutoInterval({ commit, state }: JokesContext) {
    commit(JokesMutations.SET_AUTO_INTERVAL_ACTIVE, !state.autoIntervalActive);
  },
};

const getters: GetterTree<JokesState, RootState> = {
  jokes(state: JokesState) {
    return state.jokeCollection.jokes || [];
  },
  autoIntervalActive(state: JokesState) {
    return state.autoIntervalActive;
  },
};

export const $jokesModule: ModuleDispatcher<JokesState, RootState, Actions> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  dispatch: createDispatcher<Actions>(jokesNamespace)
};
