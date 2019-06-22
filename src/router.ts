
import Vue from "vue";
import VueRouter, {
  RouterOptions,
  RouteConfig
} from "vue-router";

Vue.use(VueRouter);

import Storefront from "./layouts/storefront";
import NotFound from "./layouts/notFound";

export enum RouteName {
  STOREFRONT = "storefront",
  NOT_FOUND = "not-found",
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    redirect: `/${RouteName.STOREFRONT}/`,
    meta: {
      requiresAuthentication: false,
    }
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
