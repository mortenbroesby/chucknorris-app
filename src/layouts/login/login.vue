<template>
  <div id="login">
    <div class="centerContent">
      <div class="loginForm">
        <div class="header">
          <h1 class="title">Login</h1>
        </div>

        <div class="inputContainer">
          <input
            id="inputUsername"
            class="input input--username"
            type="username"
            v-model="username"
            placeholder="Input username"
          />
          <input
            id="inputPassword"
            class="input input--password"
            type="password"
            v-model="password"
            placeholder="Input password"
          />
        </div>

        <div class="buttonContainer">
          <button
            id="clearFields"
            class="button button--clearFields"
            @click="clearFields">
            Clear fields
          </button>
          <button
            id="submitLogin"
            class="button button--submitLogin"
            @click="submitLogin">
            Login
          </button>
        </div>

        <div class="toast" v-show="toastIsVisible">
          {{ toastMessageToDisplay }}
        </div>
      </div>
    </div>
  </div>
</template>
