import Vue from "vue";
import { Component } from "vue-property-decorator";

import { RootState } from "../store";
import { JokesState, jokesNamespace } from "../store/jokes.module";

@Component
export default class StoreMixin extends Vue {
  get rootState(): RootState {
    return this.$store.state;
  }

  get jokesState(): JokesState {
    return this.$store.state[jokesNamespace];
  }
}
