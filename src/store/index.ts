import Vue from "vue";
import * as Vuex from "vuex";

Vue.use(Vuex);

type Mutations = typeof mutations;
type Actions = typeof actions;

interface Dispatch {
  (action: keyof Actions, payload?: any, options?: Vuex.DispatchOptions): Promise<any>;
}

interface Commit {
  (type: keyof Mutations, payload?: any, options?: Vuex.CommitOptions): void;
}

type Context = {
  dispatch: Dispatch;
  commit: Commit;
  state: RootState;
};

class TypedStore extends Vuex.Store<RootState> {
  commit: Commit;
  dispatch: Dispatch;
}

export interface RootState {
  spinnerVisible: boolean;
  userIsAuthenticated: boolean;
}

export const state: RootState = {
  spinnerVisible: false,
  userIsAuthenticated: true,
};

const mutations = {
  SET_SPINNER_VISIBILITY(prevState: RootState, isVisible: boolean): void {
    prevState.spinnerVisible = isVisible;
  },
  SET_USER_AUTHENTICATED(prevState: RootState, isAuthenticated: boolean): void {
    prevState.userIsAuthenticated = isAuthenticated;
  },
};

const actions = {
  setSpinner({ commit }: Context, loadingIndicatorState: boolean): void {
    commit("SET_SPINNER_VISIBILITY", loadingIndicatorState);
  },
  setUserAuthenticated({ commit }: Context, authenticationState: boolean): void {
    commit("SET_USER_AUTHENTICATED", authenticationState);
  },
};

export const $store = new TypedStore({
  state: state,
  mutations: mutations,
  actions: actions
});
