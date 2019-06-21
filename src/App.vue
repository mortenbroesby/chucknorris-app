<template>
  <div id="test" class="test">
    <spinner v-show="spinnerVisible"></spinner>

    <transition name="fade" mode="out-in">
      <router-view
        v-if="applicationHasLoaded"
        class="main-view">
      </router-view>
    </transition>
  </div>
</template>
