import Logger from "js-logger";
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { $store } from "../../store";
import StoreMixin from "../../mixins/store.mixin";
import { $jokesModule } from "../../store/jokes.module";

import { JokeCollectionModel } from "../../models/jokeCollection.model";
import { JokeModel } from "../../models/joke.model";

import template from "./storefront.vue";
import "./storefront.scss";

@Component({
  mixins: [template],
  components: {}
})
export default class Storefront extends mixins(StoreMixin) {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  autoAddJokes: boolean = false;

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    Logger.info("Storefront loaded");
  }

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get jokes(): JokeModel[] {
    return this.jokesState.jokeCollection.jokes || [];
  }

  get autoIntervalActive(): boolean {
    return this.jokesState.autoIntervalActive;
  }

  get autoJokeButtonMessage() {
    return this.autoIntervalActive
      ? "Stop adding random joke to favorites every 5 seconds"
      : "Start adding random joke to favorites every 5 seconds";
  }

  get fetchJokesButtonMessage() {
    return this.jokes.length > 0
      ? "Get new Chuck Norris jokes"
      : "Get Chuck Norris jokes";
  }

  /*************************************************/
  /* Methods */
  /*************************************************/
  fetchJokes() {
    $jokesModule.dispatch("getJokes");
  }

  addToFavorites(joke: JokeModel) {
    Logger.info("addToFavorites - joke: ", joke);
  }

  toggleAutoJokeInterval() {
    Logger.info("toggleAutoJokeInterval");
    $jokesModule.dispatch("toggleAutoInterval");
  }

  logoutUser() {
    $store.dispatch("logoutUser");
  }
}
