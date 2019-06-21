<template>
  <div id="login">
    <div class="inputs">
      <input
        id="inputUsername"
        class="input"
        type="username"
        v-model="username"
        placeholder="Input username"
      />
      <input
        id="inputPassword"
        class="input"
        type="password"
        v-model="password"
        placeholder="Input password"
      />
    </div>

    <div class="buttons">
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
  </div>
</template>
