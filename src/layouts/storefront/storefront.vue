<template>
  <div id="storefront" class="storefront">
    <div class="chuckNorris" :class="{ blur: !noJokesVisible }"></div>

    <div class="centerContent">
      <div class="contentContainer">
        <div class="header">
          <h1 class="title">Daily dose of Chuck Norris jokes</h1>
          <div class="actions">
            <div class="buttonContainer">
              <button
                id="fetchJokes"
                class="button button--fetchJokes"
                @click="fetchJokes">
                {{ fetchJokesButtonMessage }}
              </button>
              <button
                id="toggleAutoJokeInterval"
                class="button button--toggleAutoJokeInterval"
                @click="toggleAutoJokeInterval">
                {{ autoJokeButtonMessage }}
              </button>
              <button
                id="logoutUser"
                class="button button--logoutUser"
                @click="logoutUser">
                Logout
              </button>
            </div>
          </div>
        </div>

        <div class="body">
          <div class="helperMessage" v-if="noJokesVisible">
            <p class="message">Press the button above named ''Get Chuck Norris jokes'' to retrieve some jokes!</p>
          </div>

          <div class="favoriteJokes-container" v-if="favoritesVisible">
            <h2 class="title">Your Favorite Jokes</h2>
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
            <h2 class="title">Random Jokes</h2>
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
