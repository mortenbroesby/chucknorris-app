
import Vue from "vue";
import VueRouter, {
  RouterOptions,
  RouteConfig
} from "vue-router";

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
  },
  {
    path: `/${RouteName.STOREFRONT}/`,
    name: RouteName.STOREFRONT,
    component: Storefront,
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