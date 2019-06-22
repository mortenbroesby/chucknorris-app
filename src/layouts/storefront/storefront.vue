<template>
  <div id="storefront" class="storefront">

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
          <div class="joke-container">
            <div class="joke--item"
              v-for="(joke, index) in jokes"
              :key="index">
              <p class="joke--message" v-html="joke.message"></p>
              <button
                class="joke--button joke--button_favorite"
                v-on:click="addToFavorites(joke)">
                Add to favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
