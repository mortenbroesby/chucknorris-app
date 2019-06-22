import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { $store } from "../../store";

import template from "./popup.vue";
import "./popup.scss";

@Component({
  mixins: [template],
  components: {}
})
export default class Popup extends Vue {
  /*************************************************/
  /* EXTERNAL PROPERTIES */
  /*************************************************/
  @Prop({ default: "default" })
  type: string;

  /*************************************************/
  /* METHODS */
  /*************************************************/
  closePopup() {
    $store.dispatch("setPopupVisible", false);
  }
}
