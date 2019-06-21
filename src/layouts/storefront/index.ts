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
  mounted() {
    Logger.info("Storefront loaded");
  }

  fetchJokes() {
    getJokes(10).then((jokeCollection: JokeCollectionModel) => {
      jokeCollection.jokes.forEach((joke: JokeModel) => {
        Logger.info("jokeCollection - joke: ", joke);
      });
    }).catch((error) => {
      Logger.error("getJokes error: ", error);
    });
  }

  logoutUser() {
    $store.dispatch("logoutUser");
  }
}
