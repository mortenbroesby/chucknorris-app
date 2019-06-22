<template>
  <div class="popup" :class="[`popup--${type}`]">
    <div class="popup-inner">
      <slot></slot>
    </div>
  </div>
</template>

