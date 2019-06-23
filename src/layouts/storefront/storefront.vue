<template>
  <div id="storefront" class="storefront">
    <div class="chuckNorris" :class="{ blur: !noJokesVisible }"></div>

    <div class="logoutUserContainer">
      <button
        class="button"
        @click="userIsAuthenticated ? logoutUser() : showLogin()">
        {{ userIsAuthenticated ? 'Logout' : 'Login' }}
      </button>
    </div>

    <div class="centerContent">
      <div class="contentContainer">
        <div class="header">
          <h1 class="title">Daily dose of</h1>
          <h1 class="title title--bold">Chuck Norris</h1>

          <div class="actions">
            <div class="buttonContainer">
              <button
                id="fetchJokes"
                :class="[
                  `${!noJokesVisible ? 'button' : 'buttonLarge'}`,
                  `${!noJokesVisible ? 'button' : 'buttonLarge'}--fetchJokes`
                ]"
                @click="fetchJokes">
                <i class="material-icons" v-if="!noJokesVisible">refresh</i>
                {{ fetchJokesButtonMessage }}
              </button>
              <button
                v-if="!noJokesVisible"
                id="toggleAutoJokeInterval"
                class="button button--toggleAutoJokeInterval"
                @click="toggleAutoJokeInterval">
                <i class="material-icons">{{ autoIntervalActive ? 'cancel' : 'av_timer' }}</i>
                {{ autoJokeButtonMessage }}
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
