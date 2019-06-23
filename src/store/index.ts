import Vue from "vue";
import * as Vuex from "vuex";
import { UserCredentials } from "../interfaces";
import { setItem, getItem, removeItem } from "../utilities";
import { jokesNamespace, $jokesModule } from "./jokes.module";

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

  // Popups
  loginPopupVisible: boolean;

  // Authentication
  userIsAuthenticated: boolean;
  userCredentials: UserCredentials;
}

export const state: RootState = {
  // Application
  applicationHasLoaded: false,
  spinnerVisible: false,

  // Popups
  loginPopupVisible: false,

 // Authentication
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
  SET_LOGIN_POPUP_VISIBILITY(prevState: RootState, isVisible: boolean) {
    prevState.loginPopupVisible = isVisible;
  },
  SET_USER_AUTHENTICATED(prevState: RootState, isAuthenticated: boolean): void {
    prevState.userIsAuthenticated = isAuthenticated;
  },
  SET_USER_CREDENTIALS(prevState: RootState, credentials: UserCredentials) {
    prevState.userCredentials = credentials;
  },
};

const actions = {
  initialise({ dispatch }: Context): Promise<void> {
    const savedCredentials = getItem("userCredentials");
    if (savedCredentials) {
      dispatch("loginUser", savedCredentials);
    } else {
      dispatch("setLoginPopupVisible", true);
    }

    return new Promise((resolve) => {
      // Simulate load to API.
      setTimeout(() => {
        dispatch("setApplicationInitialised", true);
        resolve();
      }, 660);
    });
  },
  setApplicationInitialised({ commit }: Context, hasInitialised: boolean) {
    commit("SET_APPLICATION_INITIALISED", hasInitialised);
  },
  setSpinner({ commit }: Context, isVisible: boolean): void {
    commit("SET_SPINNER_VISIBILITY", isVisible);
  },
  setLoginPopupVisible({ commit }: Context, isVisible: boolean): void {
    commit("SET_LOGIN_POPUP_VISIBILITY", isVisible);
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
  },
  logoutUser({ dispatch }: Context): void {
    dispatch("setUserCredentials", undefined);
    dispatch("setUserAuthenticated", false);
    $jokesModule.dispatch("resetFavorites");
    $jokesModule.dispatch("resetJokesCollection");
  },
};

export const $store = new TypedStore({
  state: state,
  mutations: mutations,
  actions: actions,
  modules: {
    [jokesNamespace]: $jokesModule
  }
});
