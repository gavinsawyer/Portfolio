import { getShortcutsApi } from "@gavinsawyer/shortcuts-api";
import { HttpsFunction }   from "firebase-functions";


// noinspection JSUnusedGlobalSymbols
export const shortcutsAPI: HttpsFunction = getShortcutsApi(
  {
    environmentCollectionPath: "shortcutsEnvironment",
  },
);
