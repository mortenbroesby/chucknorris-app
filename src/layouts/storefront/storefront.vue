<template>
  <div id="storefront" class="storefront">
    <div class="chuckNorris" :class="{ blur: !noJokesVisible }"></div>

    <div class="logoutUserContainer" v-if="userIsAuthenticated">
      <button
        id="logoutUser"
        class="button button--logoutUser"
        @click="logoutUser">
        Logout
      </button>
    </div>

    <div class="centerContent">
      <div class="contentContainer">
        <div class="header">
          <h1 class="title">Daily dose of</h1>
          <h1 class="title title--bold">Chuck Norris</h1>

          <div class="actions">
            <div class="buttonContainer" v-if="jokesVisible">
              <button
                id="fetchJokes"
                class="button button--fetchJokes"
                @click="fetchJokes">
                {{ fetchJokesButtonMessage }}
              </button>
              <button
                v-if="!noJokesVisible"
                id="toggleAutoJokeInterval"
                class="button button--toggleAutoJokeInterval"
                @click="toggleAutoJokeInterval">
                <i class="material-icons" v-if="!autoIntervalActive">av_timer</i> {{ autoJokeButtonMessage }}
              </button>
            </div>
            <div class="buttonContainer" v-else>
              <button
                id="fetchJokes"
                class="buttonLarge buttonLarge--fetchJokes"
                @click="fetchJokes">
                {{ fetchJokesButtonMessage }}
              </button>
            </div>
          </div>
        </div>

        <div class="body">
          <div class="favoriteJokes-container" v-if="favoritesVisible">
            <h5 class="title">My favorites</h5>
            <div class="favoriteJoke--item"
              v-for="(joke, index) in favoriteJokes"
              :key="index">
              <p class="favoriteJoke--message" v-html="joke.message"></p>
              <button
                class="favoriteJoke--button favoriteJoke--button_unfavorite"
                v-on:click="removeFromFavorites(joke)">
                <i class="material-icons">favorite</i>
              </button>
            </div>
          </div>

          <div class="jokes-container" v-if="jokesVisible">
            <h5 class="title">Random Jokes</h5>
            <div class="joke--item"
              v-for="(joke, index) in jokes"
              :key="index">
              <p class="joke--message" v-html="joke.message"></p>
              <button
                class="joke--button joke--button_favorite"
                v-on:click="addToFavorites(joke)">
                <i class="material-icons">favorite_border</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
