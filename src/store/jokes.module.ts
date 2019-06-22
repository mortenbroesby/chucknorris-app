import Logger from "js-logger";
import { ActionContext, MutationTree, GetterTree } from "vuex";
import { RootState } from "../store";
import { createDispatcher, ModuleDispatcher } from "./utilities";
import { setItem, getItem, removeItem } from "../utilities";

import { JokeCollectionModel } from "../models/jokeCollection.model";
import { getJokes } from "../services/api.service";
import { JokeModel } from "@/models/joke.model";

export const jokesNamespace = "jokeModule";
type JokesContext = ActionContext<JokesState, RootState>;

export interface JokesState {
  jokeCollection: JokeCollectionModel;
  favorites: JokeCollectionModel;
  autoIntervalActive: boolean;
}

const state: () => JokesState = () => ({
  jokeCollection: new JokeCollectionModel(),
  favorites: new JokeCollectionModel(),
  autoIntervalActive: false,
});

export enum JokesMutations {
  SET_COLLECTION = "SET_COLLECTION",
  SET_AUTO_INTERVAL_ACTIVE = "SET_AUTO_INTERVAL_ACTIVE",
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  SET_FAVORITES = "SET_FAVORITES",
  RESET_FAVORITES = "RESET_FAVORITES",
}

let autoIntervalActiveInterval = -1;

const mutations: MutationTree<JokesState> = {
  [JokesMutations.SET_COLLECTION](prevState: JokesState, jokeCollection: JokeCollectionModel) {
    prevState.jokeCollection = jokeCollection;
  },
  [JokesMutations.SET_AUTO_INTERVAL_ACTIVE](prevState: JokesState, isActive: boolean) {
    prevState.autoIntervalActive = isActive;

    if (isActive) {
      window.clearInterval(autoIntervalActiveInterval);
      autoIntervalActiveInterval = window.setInterval(() => {
        // TODO: Add random joke to favorites until 10.
      }, 5000);
    } else {
      window.clearInterval(autoIntervalActiveInterval);
    }
  },
  [JokesMutations.ADD_TO_FAVORITES](prevState: JokesState, joke: JokeModel) {
    prevState.favorites.jokes.push(joke);
    setItem("userFavoriteJokes", prevState.favorites);
  },
  [JokesMutations.SET_FAVORITES](prevState: JokesState, jokeCollection: JokeCollectionModel) {
    prevState.favorites = jokeCollection;
    setItem("userFavoriteJokes", jokeCollection);
  },
  [JokesMutations.RESET_FAVORITES](prevState: JokesState) {
    prevState.favorites = new JokeCollectionModel();
    setItem("userFavoriteJokes", prevState.favorites);
  },
};

type Actions = typeof actions;

const actions = {
  initialise({ commit }: JokesContext) {
    commit(JokesMutations.SET_AUTO_INTERVAL_ACTIVE, false);

    const savedFavorites = getItem("userFavoriteJokes");
    if (savedFavorites) {
      commit(JokesMutations.SET_FAVORITES, savedFavorites);
    }
  },
  getJokes({ commit }: JokesContext) {
    getJokes(10).then((jokeCollection: JokeCollectionModel) => {
      commit(JokesMutations.SET_COLLECTION, jokeCollection);
    }).catch((error) => {
      Logger.error("getJokes error: ", error);
    });
  },
  addToFavorites({ commit }: JokesContext, joke: JokeModel) {
    commit(JokesMutations.ADD_TO_FAVORITES, joke);
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
