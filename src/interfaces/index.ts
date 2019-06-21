/*************************************************/
/* INTERFACES & DEFINITIONS */
/*************************************************/
export interface UserCredentials {
  username: string;
  password: string;
}

export interface InputValidationMessage {
  isValid: boolean;
  message?: string;
}
