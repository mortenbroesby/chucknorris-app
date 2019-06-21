import Vue from "vue";
import { Component } from "vue-property-decorator";
import Logger from "js-logger";

import LoginValidatorService from "../../services/loginValidator.service";
import { UserCredentials } from "../../interfaces";

import { RootState, $store } from "../../store";

import template from "./login.vue";

@Component({
  mixins: [template],
  components: {}
})
export default class Login extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  username: string = "";
  password: string = "";

  loginValidator: LoginValidatorService = new LoginValidatorService();

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get store(): RootState {
    return $store.state;
  }

  get userIsAuthenticated(): boolean {
    return this.store.userIsAuthenticated;
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  clearFields() {
    Logger.info("clearFields");
    this.username = "";
    this.password = "";
  }

  submitLogin() {
    Logger.info("submitLogin");

    this.loginValidator.checkCredentials({
      username: this.username,
      password: this.password,
    }).then((credentials: UserCredentials) => {
      Logger.info("Store credentials: ", credentials);
      $store.dispatch("loginUser", credentials);
    }).catch((error: string) => {
      Logger.error("Error logging in: ", error);
    });
  }
}
