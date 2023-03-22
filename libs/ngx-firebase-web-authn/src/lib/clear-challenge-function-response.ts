import { FunctionResponseSuccessful }   from "./function-response-successful";
import { FunctionResponseUnsuccessful } from "./function-response-unsuccessful";


interface ClearChallengeFunctionResponseSuccessful extends FunctionResponseSuccessful {}
interface ClearChallengeFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message": "Please sign in anonymously first." | "This user doesn't exist.",
}

export type ClearChallengeFunctionResponse = ClearChallengeFunctionResponseSuccessful | ClearChallengeFunctionResponseUnsuccessful;
