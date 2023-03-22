import { RegistrationResponseJSON } from "@simplewebauthn/typescript-types";


export interface VerifyRegistrationFunctionRequest {
  "registrationResponse": RegistrationResponseJSON,
}
