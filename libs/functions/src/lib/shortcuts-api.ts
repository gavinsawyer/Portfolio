import { getShortcutsApi } from "@gavinsawyer/shortcuts-api";
import { HttpsFunction }   from "firebase-functions";


export const shortcutsAPI: HttpsFunction = getShortcutsApi({
  environmentCollectionPath: "shortcutsEnvironment",
});
