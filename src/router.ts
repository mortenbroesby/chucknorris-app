
import Logger from "js-logger";
import Vue from "vue";
import VueRouter, {
  RouterOptions,
  RouteConfig
} from "vue-router";

import { $store } from "./store";

Vue.use(VueRouter);

import Login from "./layouts/login";
import Storefront from "./layouts/storefront";
import NotFound from "./layouts/notFound";

export enum RouteName {
  LOGIN = "login",
  STOREFRONT = "storefront",
  NOT_FOUND = "not-found",
}

export const routes: RouteConfig[] = [
  {
    path: `/${RouteName.LOGIN}/`,
    name: RouteName.LOGIN,
    component: Login,
    meta: {
      requiresAuthentication: false,
    },
  },
  {
    path: `/${RouteName.STOREFRONT}/`,
    name: RouteName.STOREFRONT,
    component: Storefront,
    meta: {
      requiresAuthentication: true,
    },
  },
  {
    path: "*",
    name: RouteName.NOT_FOUND,
    component: NotFound,
  }
];

const routeOptions: RouterOptions = {
  routes,
  mode: "hash",
  linkActiveClass: "active"
};

export const router = new VueRouter(routeOptions);

router.beforeEach((to, from, next) => {
  const requiresAuthentication = to.matched.some(record => record.meta.requiresAuthentication);
  const userIsAuthenticated = $store.state.userIsAuthenticated;

  if (requiresAuthentication && !userIsAuthenticated && to.name !== RouteName.LOGIN) {
    Logger.log("Preventing redirect, user is not logged in.");
    return next({ name: RouteName.LOGIN });
  } else if (userIsAuthenticated && to.name === RouteName.LOGIN) {
    Logger.log("No need to login, user is already authenticated");
    return next({ name: RouteName.STOREFRONT });
  }

  return next();
});
