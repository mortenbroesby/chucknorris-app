import Logger from "js-logger";

import Vue from "vue";
import { Component } from "vue-property-decorator";

import { router } from "./router";
import { $store } from "./store";

// Setup logger
const logLevel = Logger.DEBUG;
Logger.useDefaults();
Logger.setLevel(logLevel);

// Configure Vue
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.config.performance = true;

// Import components
import App from "./App.vue";

// Import styles
import "./App.scss";

/*************************************************/
/* APPLICATION SETUP  */
/*************************************************/
function initialiseApplication() {
  new Vue({
    router: router,
    store: $store,
    render: h => h(App),
  }).$mount("#app");
}

/*************************************************/
/* APPLICATION INITIALIZATION  */
/*************************************************/
initialiseApplication();