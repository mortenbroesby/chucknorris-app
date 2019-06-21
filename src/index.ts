import Logger from "js-logger";

import Vue from "vue";

import VueRouter from "vue-router";

Vue.use(VueRouter);

import router from "./router";
import { $store } from "./store";

// Setup logger
const logLevel = Logger.DEBUG;
Logger.useDefaults();
Logger.setLevel(logLevel);

Logger.info("Hello world");

// Configure Vue
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.config.performance = true;

// Import components
import App from "./App.vue";

// Import styles
import "./App.scss";

new Vue({
  router: router,
  store: $store,
  render: h => h(App),
}).$mount("#app");
