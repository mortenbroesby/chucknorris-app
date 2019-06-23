import locale from "../locale/en";
import {
  UserCredentials,
  InputValidationMessage,
  ErrorToastMessage,
  Validator,
} from "../interfaces";

import {
  stringIsEmpty,
  stringHasUpperCase,
  stringContainsOnlyLetters,
  stringContainsAlphabetSequence,
  stringContainsBlacklistedCharacters,
  stringContainsTwoOverlappingPairs,
} from "../utilities";

import {
  InputFieldType,
} from "../enums";

export default class LoginValidatorService {
  /*************************************************/
  /* ATOMIC VALIDATION */
  /*************************************************/
  checkIfStringIsEmpty(value: string): InputValidationMessage {
    const isEmpty = stringIsEmpty(value);

    if (isEmpty) {
      const errorMessage = locale.validationErrors.isEmptyPassword;
      return this.genericErrorMessage(errorMessage);
    }

    return this.genericSuccessMessage();
  }

  checkIfStringContainsAlphabetSequence(value: string): InputValidationMessage {
    const containsAlphabetSequence = stringContainsAlphabetSequence(value);

    if (!containsAlphabetSequence) {
      const errorMessage = locale.validationErrors.containsAlphabetSequence;
      return this.genericErrorMessage(errorMessage);
    }

    return this.genericSuccessMessage();
  }

  checkIfStringContainsBlacklistedCharacters(value: string): InputValidationMessage {
    const blacklistedCharacters = ["i", "O", "l"];
    const containsBlacklistedCharacters = stringContainsBlacklistedCharacters(value, blacklistedCharacters);

    if (containsBlacklistedCharacters) {
      const errorMessage = locale.validationErrors.containsBlacklistedCharacters;
      return this.genericErrorMessage(errorMessage);
    }

    return this.genericSuccessMessage();
  }

  checkIfStringContainsTwoOverlappingPairs(value: string): InputValidationMessage {
    const containsOverlappingPairs = stringContainsTwoOverlappingPairs(value);

    if (!containsOverlappingPairs) {
      const errorMessage = locale.validationErrors.containsOverlappingPairs;
      return this.genericErrorMessage(errorMessage);
    }

    return this.genericSuccessMessage();
  }

  checkIfStringIsAboveMaxLength(value: string): InputValidationMessage {
    const maxLength = 32;
    const isAboveMaxLength = value.length > maxLength;

    if (isAboveMaxLength) {
      const errorMessage = locale.validationErrors.isAboveMaxLength;
      return this.genericErrorMessage(errorMessage);
    }

    return this.genericSuccessMessage();
  }

  checkIfStringHasUpperCase(value: string): InputValidationMessage {
    const hasUppercase = stringHasUpperCase(value);

    if (hasUppercase) {
      const errorMessage = locale.validationErrors.hasUppercase;
      return this.genericErrorMessage(errorMessage);
    }

    return this.genericSuccessMessage();
  }

  checkIfStringContainsOnlyLetters(value: string): InputValidationMessage {
    const containsOnlyLetters = stringContainsOnlyLetters(value);

    if (!containsOnlyLetters) {
      const errorMessage = locale.validationErrors.containsOnlyLetters;
      return this.genericErrorMessage(errorMessage);
    }

    return this.genericSuccessMessage();
  }

  /*************************************************/
  /* MAIN VALIDATION */
  /*************************************************/
  checkUsername(value: string): InputValidationMessage {
    if (stringIsEmpty(value)) {
      const errorMessage = locale.validationErrors.isEmptyUsername;
      return this.genericErrorMessage(errorMessage);
    }

    return this.genericSuccessMessage();
  }

  checkPassword(value: string): InputValidationMessage {
    const validatorRules: Validator = {
      isEmptyPassword: this.checkIfStringIsEmpty(value),
      containsAlphabetSequence: this.checkIfStringContainsAlphabetSequence(value),
      containsBlacklistedCharacters: this.checkIfStringContainsBlacklistedCharacters(value),
      containsOverlappingPairs: this.checkIfStringContainsTwoOverlappingPairs(value),
      isAboveMaxLength: this.checkIfStringIsAboveMaxLength(value),
      hasUppercase: this.checkIfStringHasUpperCase(value),
      containsOnlyLetters: this.checkIfStringContainsOnlyLetters(value),
    };

    for (const key in validatorRules) {
      const validation: InputValidationMessage = validatorRules[key];
      if (validation.isValid === false) {
        return validation;
      }
    }

    return this.genericSuccessMessage();
  }

  /*************************************************/
  /* PUBLIC FUNCTIONS */
  /*************************************************/
  checkCredentials(credentials: UserCredentials): Promise<UserCredentials> {
    return new Promise((resolve, reject) => {
      const usernameCheck = this.checkUsername(credentials.username);
      const passwordCheck = this.checkPassword(credentials.password);

      if (usernameCheck.isValid && passwordCheck.isValid) {
        resolve(this.saltLoginCredentials(credentials));
      } else {
        const inputField = !usernameCheck.isValid
          ? InputFieldType.username
          : InputFieldType.password;

        const validation = !usernameCheck.isValid
          ? usernameCheck
          : passwordCheck;

        const toastMessage: ErrorToastMessage = {
          inputField,
          validation,
        };

        reject(toastMessage);
      }
    });
  }

  saltLoginCredentials(credentials: UserCredentials) {
    // Simple hash implementation of hashed password
    const passwordHash = require("password-hash");
    const hashedPassword = passwordHash.generate(credentials.password);

    const saltedPasswordCredentials = {
      username: credentials.username,
      password: hashedPassword,
    };

    return saltedPasswordCredentials;
  }

  /*************************************************/
  /* HELPER FUNCTIONS */
  /*************************************************/
  genericSuccessMessage(): InputValidationMessage {
    return {
      isValid: true
    };
  }

  genericErrorMessage(message: string): InputValidationMessage {
    return {
      isValid: false,
      message: message
    };
  }
}
