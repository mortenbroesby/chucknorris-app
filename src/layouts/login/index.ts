import Vue from "vue";
import { Component } from "vue-property-decorator";
import Logger from "js-logger";

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
  }
}
