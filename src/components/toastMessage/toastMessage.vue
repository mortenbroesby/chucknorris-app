<template>
  <div class="toastMessage">
    <transition name="fadeToast">
      <div class="toastItem" v-show="isVisible">
        <p class="toastItem--title">Note:</p>
        <p class="toastItem--message">{{ message }}</p>
      </div>
    </transition>
  </div>
</template>
