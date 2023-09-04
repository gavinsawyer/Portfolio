import { getShortcutsApi } from "@gavinsawyer/shortcuts-api";
import { HttpsFunction }   from "firebase-functions";


// noinspection JSUnusedGlobalSymbols
export const ShortcutsAPI: HttpsFunction = getShortcutsApi(
  {
    environmentCollectionPath: "shortcutsEnvironment",
  },
);
