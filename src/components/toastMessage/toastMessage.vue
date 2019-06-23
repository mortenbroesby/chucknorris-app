<template>
  <div class="toastMessage">
    <div class="toastMessage--inner">
      <div class="toastItem" v-show="isVisible">
        <p class="toastItem--title">Note:</p>
        <p class="toastItem--message">{{ message }}</p>
      </div>
    </div>
  </div>
</template>
