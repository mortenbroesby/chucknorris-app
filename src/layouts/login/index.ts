import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component, Watch } from "vue-property-decorator";
import StoreMixin from "../../mixins/store.mixin";

import { $store } from "../../store";
import { InputFieldType } from "../../enums";

import LoginValidatorService from "../../services/loginValidator.service";
import { UserCredentials, ErrorToastMessage } from "../../interfaces";

import InputField from "../../components/inputField";

import template from "./login.vue";
import "./login.scss";

@Component({
  mixins: [template],
  components: {
    InputField
  }
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
    this.toastMessageVisible = true;
    this.toastMessage = toastMessage;
  }

  hideToastMessage() {
    this.toastMessageVisible = false;
  }

  highlightInputField(inputField: InputFieldType) {
    return this.inputFieldWithError === inputField;
  }

  usernameChanged(value: string) {
    this.username = value || "";
  }

  passwordChanged(value: string) {
    this.password = value || "";
  }

  submitLogin() {
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
      this.setInputFieldHighlight(rejection.inputField);
      this.addToastMessage(rejection.validation.message || "");
    });
  }
}
