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
    this.$emit("closePopup");
  }

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    setTimeout(() => {
      document.addEventListener("click", this.onGeneralClick);
      document.addEventListener("keydown", this.onKeyDown);
    }, 500);
  }

  beforeDestroy() {
    document.removeEventListener("click", this.onGeneralClick);
    document.removeEventListener("keydown", this.onKeyDown);
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  onGeneralClick(event: any) {
    const element = (this.$refs.popupInner as HTMLDivElement);
    const isClickInside = element && element.contains(event.target);

    if (!isClickInside) {
      this.$emit("closePopup");
    }
  }

  onKeyDown(event: KeyboardEvent) {
    const isEscape = "key" in event && (event.key == "Escape" || event.key == "Esc") ? true : false;

    if (isEscape) {
      this.$emit("closePopup");
    }
  }
}
