import { ActionContext, MutationTree } from "vuex";
import { RootState } from "../store";
import { createDispatcher, ModuleDispatcher } from "./utilities";
import { JokeCollectionModel } from "../models/jokeCollection.model";

export const jokesNamespace = "jokes";
type JokesContext = ActionContext<JokesState, RootState>;

export interface JokesState {
  jokes: JokeCollectionModel;
}

const state: () => JokesState = () => ({
  jokes: new JokeCollectionModel()
});

export enum JokesMutations {
  SET_JOKES = "SET_JOKES",
}

const mutations: MutationTree<JokesState> = {
  [JokesMutations.SET_JOKES](prevState: JokesState, jokeCollection: JokeCollectionModel) {
    prevState.jokes = jokeCollection;
  },
};

type Actions = typeof actions;

const actions = {
  setJokes({ commit }: JokesContext, jokeCollection: number) {
    commit(JokesMutations.SET_JOKES, jokeCollection);
  },
};

export const $jokesModule: ModuleDispatcher<JokesState, RootState, Actions> = {
  namespaced: true,
  state,
  actions,
  mutations,
  dispatch: createDispatcher<Actions>(jokesNamespace)
};
