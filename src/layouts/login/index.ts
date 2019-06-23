import { mixins } from "vue-class-component";
import { Component, Watch } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";
import { $store } from "../../store";
import { InputFieldType } from "../../enums";
import locale from "../../locale/en";

import LoginValidatorService from "../../services/loginValidator.service";
import { UserCredentials, ErrorToastMessage } from "../../interfaces";

import InputField from "../../components/inputField";
import ToastMessage from "../../components/toastMessage";

import template from "./login.vue";
import "./login.scss";

@Component({
  mixins: [template],
  components: {
    InputField,
    ToastMessage,
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

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get userIsAuthenticated(): boolean {
    return this.rootState.userIsAuthenticated;
  }

  get ruleSet() {
    return [
      locale.validationErrors.containsAlphabetSequence,
      locale.validationErrors.containsOverlappingPairs,
      locale.validationErrors.isAboveMaxLength,
      locale.validationErrors.hasUppercase,
      locale.validationErrors.containsOnlyLetters,
    ];
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
    document.addEventListener("keydown", this.onKeyDown);
  }

  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
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

  usernameChanged(value: string = "") {
    this.username = value;
  }

  passwordChanged(value: string = "") {
    this.password = value;
  }

  submitLogin() {
    this.loginValidator.checkCredentials({
      username: this.username,
      password: this.password,
    }).then((credentials: UserCredentials) => {
      // Simulate load to API.
      $store.dispatch("setSpinner", true);
      setTimeout(() => {
        $store.dispatch("loginUser", credentials);
        $store.dispatch("setSpinner", false);
      }, 660);
    }).catch((rejection: ErrorToastMessage) => {
      this.setInputFieldHighlight(rejection.inputField);
      this.addToastMessage(rejection.validation.message || "");
    });
  }

  onKeyDown(event: KeyboardEvent) {
    const isEscape = event.key === "Enter" || event.which == 13;

    if (isEscape) {
      this.submitLogin();
    }
  }
}
