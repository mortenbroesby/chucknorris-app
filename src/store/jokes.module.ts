import Logger from "js-logger";
import { ActionContext, MutationTree, GetterTree } from "vuex";
import { RootState } from "../store";
import { createDispatcher, ModuleDispatcher } from "./utilities";

import { JokeCollectionModel } from "../models/jokeCollection.model";
import { getJokes } from "../services/api.service";

export const jokesNamespace = "jokeModule";
type JokesContext = ActionContext<JokesState, RootState>;

export interface JokesState {
  jokeCollection: JokeCollectionModel;
  autoIntervalActive: boolean;
}

const state: () => JokesState = () => ({
  jokeCollection: new JokeCollectionModel(),
  autoIntervalActive: false,
});

export enum JokesMutations {
  SET_COLLECTION = "SET_COLLECTION",
  SET_AUTO_INTERVAL_ACTIVE = "SET_AUTO_INTERVAL_ACTIVE",
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
};

type Actions = typeof actions;

const actions = {
  getJokes({ commit }: JokesContext, jokeCollection: number) {
    getJokes(10).then((jokeCollection: JokeCollectionModel) => {
      commit(JokesMutations.SET_COLLECTION, jokeCollection);
    }).catch((error) => {
      Logger.error("getJokes error: ", error);
    });
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
