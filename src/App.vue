<template>
  <div id="application" class="application">
    <spinner v-show="spinnerVisible"></spinner>
    <popup v-if="!userIsAuthenticated && !spinnerVisible && popupIsVisible" type="login">
      <login v-if="!userIsAuthenticated"></login>
    </popup>

    <transition name="fade" mode="out-in">
      <router-view
        v-if="applicationHasLoaded"
        class="main-view">
      </router-view>
    </transition>
  </div>
</template>
