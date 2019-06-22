import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";
import StoreMixin from "../../mixins/store.mixin";
import { stringIsEmpty } from "../../utilities";

import { RootState, $store } from "../../store";

import LoginValidatorService from "../../services/loginValidator.service";
import { UserCredentials, InputValidationMessage } from "../../interfaces";

import template from "./login.vue";
import "./login.scss";

@Component({
  mixins: [template],
  components: {}
})
export default class Login extends mixins(StoreMixin)  {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  username: string = "";
  password: string = "";

  toastMessage: string = "";
  toastMessageClearTimeout: any = -1;

  loginValidator: LoginValidatorService = new LoginValidatorService();

  isVisible: boolean = false;

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get userIsAuthenticated(): boolean {
    return this.state.userIsAuthenticated;
  }

  get toastIsVisible(): boolean {
    return !stringIsEmpty(this.toastMessage);
  }

  get toastMessageToDisplay() {
    return `Note: ${this.toastMessage}`;
  }

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    setTimeout(() => {
      this.isVisible = true;
    }, 500);
  }

  beforeDestroy () {
    window.clearTimeout(this.toastMessageClearTimeout);
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  clearFields() {
    Logger.info("clearFields");
    this.username = "";
    this.password = "";
  }

  showToastMessage(toastMessage: string) {
    this.toastMessage = toastMessage;

    window.clearTimeout(this.toastMessageClearTimeout);

    this.toastMessageClearTimeout = setTimeout(() => {
      this.toastMessage = "";
    }, 1500);
  }

  submitLogin() {
    Logger.info("submitLogin");

    this.loginValidator.checkCredentials({
      username: this.username,
      password: this.password,
    }).then((credentials: UserCredentials) => {
      Logger.info("Store credentials: ", credentials);
      this.isVisible = false;
      setTimeout(() => {
        $store.dispatch("loginUser", credentials);
      }, 1000);
    }).catch((rejection: InputValidationMessage) => {
      Logger.error("Error logging in: ", rejection);
      this.showToastMessage(rejection.message || "");
    });
  }
}
