import Logger from "js-logger";
import { ActionContext, MutationTree } from "vuex";
import { RootState } from "../store";
import { createDispatcher, ModuleDispatcher } from "./utilities";

import { JokeCollectionModel } from "../models/jokeCollection.model";
import { getJokes } from "../services/api.service";

export const jokesNamespace = "jokeModule";
type JokesContext = ActionContext<JokesState, RootState>;

export interface JokesState {
  jokeCollection: JokeCollectionModel;
}

const state: () => JokesState = () => ({
  jokeCollection: new JokeCollectionModel()
});

export enum JokesMutations {
  SET_JOKE_COLLECTION = "SET_JOKE_COLLECTION",
}

const mutations: MutationTree<JokesState> = {
  [JokesMutations.SET_JOKE_COLLECTION](prevState: JokesState, jokeCollection: JokeCollectionModel) {
    prevState.jokeCollection = jokeCollection;
  },
};

type Actions = typeof actions;

const actions = {
  getJokes({ commit }: JokesContext, jokeCollection: number) {
    getJokes(10).then((jokeCollection: JokeCollectionModel) => {
      commit(JokesMutations.SET_JOKE_COLLECTION, jokeCollection);
    }).catch((error) => {
      Logger.error("getJokes error: ", error);
    });
  },
};

export const $jokesModule: ModuleDispatcher<JokesState, RootState, Actions> = {
  namespaced: true,
  state,
  actions,
  mutations,
  dispatch: createDispatcher<Actions>(jokesNamespace)
};
