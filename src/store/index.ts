import Vue from "vue";
import * as Vuex from "vuex";
import { UserCredentials } from "../interfaces";
import { router, RouteName } from "../router";
import { setItem, getItem, removeItem } from "../utilities";

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
   // Application
  applicationHasLoaded: boolean;
  spinnerVisible: boolean;

 // Authentication
 userIsAuthenticated: boolean;
 userCredentials: UserCredentials;
}

export const state: RootState = {
  applicationHasLoaded: false,
  spinnerVisible: false,

  userIsAuthenticated: false,
  userCredentials: {
    username: "",
    password: ""
  },
};

const mutations = {
  SET_APPLICATION_INITIALISED(prevState: RootState, hasInitialised: boolean): void {
    prevState.applicationHasLoaded = hasInitialised;
  },
  SET_SPINNER_VISIBILITY(prevState: RootState, isVisible: boolean): void {
    prevState.spinnerVisible = isVisible;
  },
  SET_USER_AUTHENTICATED(prevState: RootState, isAuthenticated: boolean): void {
    prevState.userIsAuthenticated = isAuthenticated;
  },
  SET_USER_CREDENTIALS(prevState: RootState, credentials: UserCredentials) {
    prevState.userCredentials = credentials;
  },
};

const actions = {
  initialiseApplication({ dispatch, commit }: Context): Promise<void> {
    return new Promise((resolve) => {
      const savedCredentials = getItem("userCredentials");
      if (savedCredentials) {
        dispatch("loginUser", savedCredentials);
      }

      // Load async data, etc.
      setTimeout(() => {
        dispatch("setApplicationInitialised", true);
        resolve();
      }, 1000);
    });
  },
  setApplicationInitialised({ commit }: Context, hasInitialised: boolean) {
    commit("SET_APPLICATION_INITIALISED", hasInitialised);
  },
  setSpinner({ commit }: Context, loadingIndicatorState: boolean): void {
    commit("SET_SPINNER_VISIBILITY", loadingIndicatorState);
  },
  setUserAuthenticated({ commit }: Context, authenticationState: boolean): void {
    commit("SET_USER_AUTHENTICATED", authenticationState);
  },
  setUserCredentials({ commit }: Context, credentials?: UserCredentials): void {
    if (credentials) {
      setItem("userCredentials", credentials);
      commit("SET_USER_CREDENTIALS", credentials);
    } else {
      removeItem("userCredentials");
      commit("SET_USER_CREDENTIALS", {
        username: "",
        password: "",
      });
    }
  },
  loginUser({ dispatch }: Context, credentials?: UserCredentials): void {
    dispatch("setUserCredentials", credentials);
    dispatch("setUserAuthenticated", true);
    router.replace({ name: RouteName.STOREFRONT });
  },
  logoutUser({ dispatch }: Context): void {
    dispatch("setUserCredentials", undefined);
    dispatch("setUserAuthenticated", false);
    router.replace({ name: RouteName.LOGIN });
  },
};

export const $store = new TypedStore({
  state: state,
  mutations: mutations,
  actions: actions
});
