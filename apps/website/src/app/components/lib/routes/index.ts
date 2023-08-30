import { Route } from "@angular/router";


export const routes: Route[] = [
  {
    loadComponent: () => import("./lib/home/HomeRouteComponent").then(
      (module) => module.HomeRouteComponent,
    ),
    path:          "",
    pathMatch:     "full",
    title:         "Gavin Sawyer",
    data: {
      description: "Gavin is a software developer and BSBA graduate living in Boston. He double-majored in Global Business and Analytics and minored in Cybersecurity, and has been creating software to solve problems for over 8 years.",
    },
  },
  {
    loadComponent: () => import("./lib/privacy/PrivacyRouteComponent").then(
      (module) => module.PrivacyRouteComponent,
    ),
    path:          "privacy",
    title:         "Gavin Sawyer | Privacy",
    data: {
      description: "This site uses some in-browser functionality as well as analytics. This page outlines privacy considerations relevant to accessing the site.",
    },
  },
];
