import { InputFieldType } from "../enums";

/*************************************************/
/* INTERFACES & DEFINITIONS */
/*************************************************/
export interface UserCredentials {
  username: string;
  password: string;
}

export interface ErrorToastMessage {
  inputField: InputFieldType;
  validation: InputValidationMessage;
}

export interface InputValidationMessage {
  isValid: boolean;
  message?: string;
}

export interface List {
  message: string;
}

export interface Validator {
  [key: string]: InputValidationMessage;
}
