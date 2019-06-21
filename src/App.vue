<template>
  <div id="test" class="test">
    <spinner v-show="spinnerActive"></spinner>

    <transition name="fade" mode="out-in">
      <router-view class="main-view"/>
    </transition>
  </div>
</template>
