import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

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
}
