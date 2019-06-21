
import Vue from "vue";
import VueRouter, {
  RouterOptions,
  RouteConfig
} from "vue-router";

Vue.use(VueRouter);

import Login from "./layouts/login";

export enum RouteName {
  LOGIN = "login",
}

export const routes: RouteConfig[] = [
  {
    path: `/${RouteName.LOGIN}/`,
    name: RouteName.LOGIN,
    component: Login,
  },
];

const routeOptions: RouterOptions = {
  routes,
  mode: "hash",
  linkActiveClass: "active"
};

export const router = new VueRouter(routeOptions);