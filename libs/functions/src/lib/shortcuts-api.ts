import { getShortcutsApi } from "@gavinsawyer/shortcuts-api";
import { HttpsFunction }   from "firebase-functions";


export const shortcutsApi: HttpsFunction = getShortcutsApi({
  environmentCollectionPath: "shortcutsEnvironment",
});
