import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";

import { $store } from "../../store";
import StoreMixin from "../../mixins/store.mixin";
import { $jokesModule } from "../../store/jokes.module";

import { JokeModel } from "../../models/joke.model";

import ListView from "../../components/listView";

import template from "./storefront.vue";
import "./storefront.scss";

@Component({
  mixins: [template],
  components: {
    ListView,
  }
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
  get userIsAuthenticated() {
    return this.rootState.userIsAuthenticated;
  }

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
      ? "Stop automatically marking jokes as favorites. Start reading jokes!"
      : "Start with automatically marking jokes as favorites every 5 sec. Why not?";
  }

  get jokesVisible() {
    return this.jokes.length > 0;
  }

  get fetchJokesButtonMessage() {
    return !this.noJokesVisible
      ? "Get new jokes"
      : "Get my dose now";
  }

  get favoritesVisible() {
    return this.favoriteJokes.length > 0;
  }

  get noJokesVisible() {
    return (!this.jokesVisible && !this.favoritesVisible);
  }

  /*************************************************/
  /* Methods */
  /*************************************************/
  fetchJokes() {
    // Simulate load for user experience
    $store.dispatch("setSpinner", true);
    setTimeout(() => {
      $jokesModule.dispatch("getJokes");
      $store.dispatch("setSpinner", false);
    }, 250);
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

  showLogin() {
    $store.dispatch("setPopupVisible", true);
  }

  logoutUser() {
    // Simulate load to API.
    $store.dispatch("setSpinner", true);
    setTimeout(() => {
      $store.dispatch("logoutUser");
      $store.dispatch("setSpinner", false);
    }, 660);
  }
}
