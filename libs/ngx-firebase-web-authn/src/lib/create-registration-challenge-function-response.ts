import { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import { FunctionResponseSuccessful }   from "./function-response-successful";
import { FunctionResponseUnsuccessful } from "./function-response-unsuccessful";


interface CreateRegistrationChallengeFunctionResponseSuccessful extends FunctionResponseSuccessful {
  "creationOptions": PublicKeyCredentialCreationOptionsJSON,
}
interface CreateRegistrationChallengeFunctionResponseUnsuccessful extends FunctionResponseUnsuccessful {
  "message": "Please sign in anonymously first." | "A passkey already exists for this user.",
}

export type CreateRegistrationChallengeFunctionResponse = CreateRegistrationChallengeFunctionResponseSuccessful | CreateRegistrationChallengeFunctionResponseUnsuccessful;
