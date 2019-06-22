<template>
  <div id="login" class="login">
    <div class="centerContent">
      <transition name="fadeLogin">
        <div class="loginForm">
          <div class="header">
            <h1 class="title">Login</h1>
          </div>

          <div class="inputContainer">
            <input-field
              id="inputUsername"
              type="username"
              placeholder="Your username."
              :value="username"
              :isHighlighted="highlightInputField('username')"
              @onChange="usernameChanged">
            </input-field>
            <input-field
              id="inputPassword"
              type="password"
              placeholder="Your password."
              :value="password"
              :isHighlighted="highlightInputField('password')"
              @onChange="passwordChanged">
            </input-field>
          </div>

          <div class="buttonContainer">
            <button
              id="clearFields"
              class="button button--clearFields"
              @click="clearFields()">
              Clear fields
            </button>
            <button
              id="submitLogin"
              class="button button--submitLogin"
              @click="submitLogin()">
              Login
            </button>
          </div>

          <toast-message
            :message="toastMessage"
            :isVisible="toastMessageVisible">
          </toast-message>
        </div>
      </transition>
    </div>

  </div>
</template>
