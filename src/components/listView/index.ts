import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { List } from "../../interfaces";

import template from "./listView.vue";
import "./listView.scss";

@Component({
  mixins: [template],
  components: {}
})
export default class ListView extends Vue {
  /*************************************************/
  /* EXTERNAL PROPERTIES */
  /*************************************************/
  @Prop({ default: [] })
  list: List[];

  @Prop({ default: "" })
  title: string;

  @Prop({ default: false })
  isVisible: boolean;

  @Prop({ default: "favorite" })
  buttonIcon: string;

  /*************************************************/
  /* METHODS */
  /*************************************************/
  isClicked(item: any) {
    this.$emit("click", item);
  }
}
