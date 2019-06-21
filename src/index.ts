import Logger from "js-logger";

import Vue from "vue";
import { Component } from "vue-property-decorator";

import { router } from "./router";
import { $store, RootState } from "./store";

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

import Spinner from "./components/spinner";

// Import styles
import "./App.scss";

/*************************************************/
/* APPLICATION SETUP  */
/*************************************************/
function initialiseApplication() {
  @Component({
    mixins: [App],
    store: $store,
    router: router,
    components: {
      Spinner,
    },
  })
  class Application extends Vue {
    /*************************************************/
    /* LIFE CYCLE EVENTS */
    /*************************************************/
    mounted() {
      Logger.info("Application initialised.");
    }

    /*************************************************/
    /* COMPUTED'S */
    /*************************************************/
    get store(): RootState {
      return $store.state;
    }

    get spinnerVisible(): boolean {
      return this.store.spinnerVisible;
    }
  }

  new Application().$mount("#app");
}

/*************************************************/
/* APPLICATION INITIALIZATION  */
/*************************************************/
initialiseApplication();
