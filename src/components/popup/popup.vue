<template>
  <div class="popup" :class="[`popup--${type}`]">
    <div class="popup-inner" ref="popupInner">
      <button class="closePopup" @click="closePopup">
        <i class="material-icons">close</i>
      </button>
      <slot></slot>
    </div>
  </div>
</template>
