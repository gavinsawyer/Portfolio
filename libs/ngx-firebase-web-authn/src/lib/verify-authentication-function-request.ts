import { AuthenticationResponseJSON } from "@simplewebauthn/typescript-types";


export interface VerifyAuthenticationFunctionRequest {
  "authenticationResponse": AuthenticationResponseJSON,
}
