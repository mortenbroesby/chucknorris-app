import Vue from "vue";
import { Component } from "vue-property-decorator";
import { RouteName } from "../../router";

import template from "./notFound.vue";
import { $store, RootState } from "../../store";

@Component({
  mixins: [template],
  components: {}
})
export default class NotFound extends Vue {
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
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    setTimeout(() => {
      this.redirectUser();
    }, 1500);
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  redirectUser() {
    if (!$store.state.userIsAuthenticated) {
      this.$router.replace({
        name: RouteName.LOGIN
      });
    } else {
      this.$router.replace({
        name: RouteName.STOREFRONT
      });
    }
  }
}
