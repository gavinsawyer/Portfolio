import { CallableRequestData, CallableResponseData, getShortcutsApi } from "@gavinsawyer/shortcuts-api";
import { CallableFunction }                                           from "firebase-functions/v2/https";


// noinspection JSUnusedGlobalSymbols
export const ShortcutsApi: CallableFunction<CallableRequestData, Promise<CallableResponseData>> = getShortcutsApi();
