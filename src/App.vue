<template>
  <div id="application" class="application">
    <spinner v-show="spinnerVisible"></spinner>

    <popup v-if="!userIsAuthenticated && !spinnerVisible && loginPopupVisible" type="login" @closePopup="closeLoginPopup">
      <login v-if="!userIsAuthenticated"></login>
    </popup>

    <popup class="favoritesLimitReached" v-if="favoritesLimitPopupVisible" type="favoritesLimitReached" @closePopup="closeFavoritesLimitPopup">
      <div class="centerContent">
        <div class="message">
          <h1 class="title">Oops.</h1>
          <p class="text">You've reached your limit of {{ favoritesLimitCount }} {{ favoritesLimitCount > 1 ? 'favorites' : 'favorite'}}. </p>
        </div>
      </div>
    </popup>

    <transition name="fade" mode="out-in">
      <router-view
        v-if="applicationHasLoaded"
        class="main-view">
      </router-view>
    </transition>
  </div>
</template>
