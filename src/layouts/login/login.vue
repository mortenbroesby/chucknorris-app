<template>
  <div id="login" class="login">
    <button v-on:click="isVisible = !isVisible" style="display: none;">
      Toggle
    </button>

    <div class="centerContent">
      <transition name="fadeLogin">
        <div class="loginForm" v-show="isVisible">
          <div class="header">
            <h1 class="title">Login</h1>
          </div>

          <div class="inputContainer">
            <input
              id="inputUsername"
              class="input input--username"
              :class="{ highlight: highlightInputField('username') }"
              type="username"
              v-model="username"
              placeholder="Your username."
            />
            <input
              id="inputPassword"
              class="input input--password"
              :class="{ highlight: highlightInputField('password') }"
              type="password"
              v-model="password"
              placeholder="Your password."
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

          <div class="toastContainer">
            <transition name="fadeToast">
              <div class="toast" v-show="toastMessageVisible">
                <p class="toast--title">Note:</p>
                <p class="toast--message">{{ toastMessage }}</p>
              </div>
            </transition>
          </div>
        </div>
      </transition>
    </div>

  </div>
</template>
