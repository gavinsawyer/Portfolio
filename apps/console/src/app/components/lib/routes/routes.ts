import { Route } from "@angular/router";


export const routes: Route[] = [
  {
    data:          {
      description: "This is a private console.",
    },
    loadComponent: () => import("./lib/home/HomeRouteComponent").then(
      (module) => module.HomeRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         "Gavin Sawyer",
  },
];
