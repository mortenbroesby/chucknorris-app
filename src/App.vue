<template>
  <div id="app" class="app">
    <transition name="fade" mode="out-in">
      <router-view class="main-view"/>
    </transition>
  </div>
</template>
