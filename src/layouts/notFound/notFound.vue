<template>
  <div id="notFound" class="notFound">
    <div class="chuckNorris"></div>
    <div class="centerContent">
      <div class="contentContainer">
        <div class="header">
          <h1 class="title">- Page not found -</h1>
          <h1 class="title title--bold">Chuck Norris disapproves!</h1>
        </div>
        <div class="body">
          <button
            class="button"
            @click="redirectUser()">
            Go to Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
