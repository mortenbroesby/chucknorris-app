import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import template from "./inputField.vue";

@Component({
  mixins: [template],
  components: {}
})
export default class InputField extends Vue {
  /*************************************************/
  /* EXTERNAL PROPERTIES */
  /*************************************************/
  @Prop({ default: "" })
  id: string;

  @Prop({ default: "text" })
  type: string;

  @Prop({ default: "" })
  placeholder: string;

  @Prop({ default: false })
  isHighlighted: boolean;

  @Prop({ default: "" })
  value: string;

  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  enteredInput: string = "";

  /*************************************************/
  /* WATCHERS */
  /*************************************************/
  @Watch("enteredInput")
  onEnteredInputChange() {
    this.$emit("onChange", this.enteredInput);
  }

  @Watch("value")
  onValueChange() {
    this.enteredInput = this.value;
  }
}
