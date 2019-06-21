import Vue from "vue";
import { Component } from "vue-property-decorator";
import Logger from "js-logger";

import template from "./storefront.vue";

@Component({
  mixins: [template],
  components: {}
})
export default class Storefront extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  mounted() {
    Logger.info("Storefront loaded");
  }
}
