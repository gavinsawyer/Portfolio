import { Route } from "@angular/router";


export const routes: Route[] = [
  {
    loadComponent: () => import("./lib/otherwise/OtherwiseRouteComponent").then(
      (module) => module.OtherwiseRouteComponent,
    ),
    path:          "**",
    title:         "Gavin Sawyer | Page not found",
    data: {
      description: "This page was not found.",
    },
  },
];
