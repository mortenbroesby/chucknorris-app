import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component, Watch } from "vue-property-decorator";
import StoreMixin from "../../mixins/store.mixin";

import { $store } from "../../store";
import { InputFieldType } from "../../enums";

import LoginValidatorService from "../../services/loginValidator.service";
import { UserCredentials, ErrorToastMessage } from "../../interfaces";

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
  toastMessageVisible: boolean = false;
  inputFieldWithError: InputFieldType | undefined = undefined;

  loginValidator: LoginValidatorService = new LoginValidatorService();

  isVisible: boolean = false;

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get userIsAuthenticated(): boolean {
    return this.rootState.userIsAuthenticated;
  }

  get toastMessageToDisplay() {
    return `Note: ${this.toastMessage}`;
  }

  /*************************************************/
  /* WATCHERS */
  /*************************************************/
  @Watch("username")
  @Watch("password")
  onInputChange() {
    this.hideToastMessage();
    this.clearHighlightedInput();
  }

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    setTimeout(() => {
      this.isVisible = true;
    }, 500);
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  clearFields() {
    Logger.info("clearFields");
    this.username = "";
    this.password = "";
  }

  setInputFieldHighlight(inputField: InputFieldType) {
    this.inputFieldWithError = inputField;
  }

  clearHighlightedInput() {
    this.inputFieldWithError = undefined;
  }

  addToastMessage(toastMessage: string) {
    Logger.info("addToastMessage: ", toastMessage);
    this.toastMessageVisible = true;
    this.toastMessage = toastMessage;
  }

  hideToastMessage() {
    this.toastMessageVisible = false;
  }

  highlightInputField(inputField: InputFieldType) {
    return this.inputFieldWithError === inputField;
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
    }).catch((rejection: ErrorToastMessage) => {
      Logger.error("Error logging in: ", rejection);
      this.setInputFieldHighlight(rejection.inputField);
      this.addToastMessage(rejection.validation.message || "");
    });
  }
}
