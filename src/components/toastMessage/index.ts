import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import template from "./toastMessage.vue";
import "./toastMessage.scss";

@Component({
  mixins: [template],
  components: {}
})
export default class ToastMessage extends Vue {
  /*************************************************/
  /* EXTERNAL PROPERTIES */
  /*************************************************/
  @Prop({ default: "" })
  message: string;

  @Prop({ default: false })
  isVisible: boolean;
}
