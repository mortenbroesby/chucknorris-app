import Logger from "js-logger";

import Vue from "vue";

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
  render: h => h(App),
}).$mount("#app");
