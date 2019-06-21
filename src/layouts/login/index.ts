import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./login.vue";

@Component({
  mixins: [template],
  components: {}
})
export default class Login extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  userLoggedIn: boolean = false;
}
