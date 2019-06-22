<template>
  <input
    class="input"
    :class="[`input--${type}`, {
      highlight: isHighlighted
    }]"
    :type="type"
    v-model="enteredInput"
    :placeholder="placeholder"
  />
</template>
