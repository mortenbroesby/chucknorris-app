<template>
  <div class="listView" v-if="isVisible">
    <h5 class="title">{{ title }}</h5>
    <div class="listView--item"
      v-for="(item, index) in list"
      :key="index">
      <p class="listView--message" v-html="item.message"></p>
      <button
        class="listView--button"
        v-on:click="isClicked(item)">
        <i class="material-icons">{{ buttonIcon }}</i>
      </button>
    </div>
  </div>
</template>
