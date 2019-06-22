import Vue from "vue";
import { Component } from "vue-property-decorator";
import Logger from "js-logger";
import { $store } from "../../store";

import { getJokes } from "../../services/api.service";

import { JokeCollectionModel } from "../../models/jokeCollection.model";
import { JokeModel } from "../../models/joke.model";

import template from "./storefront.vue";
import "./storefront.scss";

@Component({
  mixins: [template],
  components: {}
})
export default class Storefront extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  jokeCollection: JokeCollectionModel = new JokeCollectionModel();

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
    return this.jokeCollection.jokes || [];
  }

  get autoJokeButtonMessage() {
    return this.autoAddJokes
      ? "Stop adding random joke to favorites every 5 seconds"
      : "Start adding random joke to favorites every 5 seconds";
  }

  /*************************************************/
  /* Methods */
  /*************************************************/
  fetchJokes() {
    getJokes(10).then((jokeCollection: JokeCollectionModel) => {
      this.jokeCollection = jokeCollection;

      jokeCollection.jokes.forEach((joke: JokeModel) => {
        Logger.info("jokeCollection - joke: ", joke);
      });
    }).catch((error) => {
      Logger.error("getJokes error: ", error);
    });
  }

  addToFavorites(joke: JokeModel) {
    Logger.info("addToFavorites - joke: ", joke);
  }

  refreshJokes() {
    this.jokeCollection = new JokeCollectionModel();
    this.fetchJokes();
  }

  toggleAutoJokeInterval() {
    Logger.info("toggleAutoJokeInterval");
    this.autoAddJokes = !this.autoAddJokes;
  }

  logoutUser() {
    $store.dispatch("logoutUser");
  }
}
