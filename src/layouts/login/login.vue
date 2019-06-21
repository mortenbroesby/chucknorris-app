<template>
  <div id="login">
    <input
      id="inputUsername"
      v-model="username"
      placeholder="Input username"
    />
    <input
      id="inputPassword"
      v-model="password"
      placeholder="Input password"
    />

    <button
      id="clearFields"
      @click="clearFields">
      Clear fields
    </button>
    <button
      id="submitLogin"
      @click="submitLogin">
      Login
    </button>
  </div>
</template>
