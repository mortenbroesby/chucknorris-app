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
    $jokesModule.dispatch("initialise");
  }

  beforeDestroy () {
    $jokesModule.dispatch("setAutoIntervalActive", false);
  }

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get jokes(): JokeModel[] {
    return this.jokesState.jokeCollection.jokes || [];
  }

  get favoriteJokes(): JokeModel[] {
    return this.jokesState.favorites.jokes || [];
  }

  get autoIntervalActive(): boolean {
    return this.jokesState.autoIntervalActive;
  }

  get autoJokeButtonMessage() {
    return this.autoIntervalActive
      ? "Stop adding random joke to favorites every 5 seconds"
      : "Start adding random joke to favorites every 5 seconds";
  }

  get jokesVisible() {
    return this.jokes.length > 0;
  }

  get fetchJokesButtonMessage() {
    return this.jokesVisible
      ? "Get new Chuck Norris jokes"
      : "Get Chuck Norris jokes";
  }

  get favoritesVisible() {
    return this.favoriteJokes.length > 0;
  }

  /*************************************************/
  /* Methods */
  /*************************************************/
  fetchJokes() {
    $jokesModule.dispatch("getJokes");
  }

  addToFavorites(joke: JokeModel) {
    $jokesModule.dispatch("addToFavorites", joke);
  }

  removeFromFavorites(joke: JokeModel) {
    $jokesModule.dispatch("removeFromFavorites", joke);
  }

  toggleAutoJokeInterval() {
    $jokesModule.dispatch("toggleAutoInterval");
  }

  logoutUser() {
    $store.dispatch("logoutUser");
  }
}
