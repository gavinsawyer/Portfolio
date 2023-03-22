import { FunctionResponseSuccessful }   from "./function-response-successful";
import { FunctionResponseUnsuccessful } from "./function-response-unsuccessful";


interface VerifyRegistrationFunctionResponseSuccessful extends FunctionResponseSuccessful {
  "customToken": string,
}
interface VerifyRegistrationFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message":  "Please create a registration challenge first." | "Please sign in anonymously first." | "Registration response not verified." | "This user doesn't exist.",
}

export type VerifyRegistrationFunctionResponse = VerifyRegistrationFunctionResponseSuccessful | VerifyRegistrationFunctionResponseUnsuccessful;
