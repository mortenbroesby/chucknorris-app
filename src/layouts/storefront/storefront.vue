<template>
  <div id="storefront" class="storefront">
    <div class="chuckNorris" :class="{ blur: !noJokesVisible }"></div>

    <div class="logoutUserContainer">
      <button
        v-if="!userIsAuthenticated"
        id="showLogin"
        class="button button--showLogin"
        @click="showLogin">
        Login
      </button>
      <button
        v-else
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
                <i class="material-icons">{{ autoIntervalActive ? 'cancel' : 'av_timer' }}</i> {{ autoJokeButtonMessage }}
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
          <list-view
            title="My favorites"
            buttonIcon="favorite"
            :list="favoriteJokes"
            :isVisible="favoritesVisible"
            @click="removeFromFavorites">
          </list-view>

          <list-view
            title="Random Jokes"
            buttonIcon="favorite_border"
            :list="jokes"
            :isVisible="jokesVisible"
            @click="addToFavorites">
          </list-view>
        </div>
      </div>
    </div>

  </div>
</template>
