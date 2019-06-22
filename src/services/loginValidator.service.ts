import Logger from "js-logger";

import {
  UserCredentials,
  InputValidationMessage,
  ErrorToastMessage,
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
    const errorMessage = "Passwords cannot be empty.";

    if (isEmpty) {
      return {
        isValid: false,
        message: errorMessage
      };
    }

    return this.genericSuccessMessage();
  }

  checkIfStringContainsAlphabetSequence(value: string): InputValidationMessage {
    const containsAlphabetSequence = stringContainsAlphabetSequence(value);
    const errorMessage = "Passwords must include one increasing straight of at least three letters, like abc, cde, fgh,and so on, up to xyz. They cannot skip letters; acd doesn't count.";

    if (!containsAlphabetSequence) {
      return {
        isValid: false,
        message: errorMessage
      };
    }

    return this.genericSuccessMessage();
  }

  checkIfStringContainsBlacklistedCharacters(value: string): InputValidationMessage {
    const blacklistedCharacters = ["i", "O", "l"];
    const containsBlacklistedCharacters = stringContainsBlacklistedCharacters(value, blacklistedCharacters);
    const errorMessage = "Passwords may not contain the letters i, O, or l, as these letters can be mistaken for other characters and are therefore confusing.";

    if (containsBlacklistedCharacters) {
      return {
        isValid: false,
        message: errorMessage
      };
    }

    return this.genericSuccessMessage();
  }

  checkIfStringContainsTwoOverlappingPairs(value: string): InputValidationMessage {
    const containsOverlappingPairs = stringContainsTwoOverlappingPairs(value);
    const errorMessage = "Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc.";

    if (!containsOverlappingPairs) {
      return {
        isValid: false,
        message: errorMessage
      };
    }

    return this.genericSuccessMessage();
  }

  checkIfStringIsAboveMaxLength(value: string): InputValidationMessage {
    const maxLength = 32;
    const isAboveMax = value.length > maxLength;
    const errorMessage = "Passwords cannot be longer than 32 characters.";

    if (isAboveMax) {
      return {
        isValid: false,
        message: errorMessage
      };
    }

    return this.genericSuccessMessage();
  }

  checkIfStringHasUpperCase(value: string): InputValidationMessage {
    const hasUppercase = stringHasUpperCase(value);
    const errorMessage = "Passwords can only contain lower case characters.";

    if (hasUppercase) {
      return {
        isValid: false,
        message: errorMessage
      };
    }

    return this.genericSuccessMessage();
  }

  checkIfStringContainsOnlyLetters(value: string): InputValidationMessage {
    const containsOnlyLetters = stringContainsOnlyLetters(value);
    const errorMessage = "Passwords can only contain alphabetic characters.";

    if (!containsOnlyLetters) {
      return {
        isValid: false,
        message: errorMessage
      };
    }

    return this.genericSuccessMessage();
  }

  /*************************************************/
  /* MAIN VALIDATION */
  /*************************************************/
  checkUsername(value: string): InputValidationMessage {
    if (stringIsEmpty(value)) {
      return {
        isValid: false,
        message: "Usernames cannot be empty."
      };
    }

    return this.genericSuccessMessage();
  }

  checkPassword(value: string): InputValidationMessage {
    const validationEmpty = this.checkIfStringIsEmpty(value);
    if (!validationEmpty.isValid) {
      return validationEmpty;
    }

    const validationAlphabetSequence = this.checkIfStringContainsAlphabetSequence(value);
    if (!validationAlphabetSequence.isValid) {
      return validationAlphabetSequence;
    }

    const validationBlacklistedCharacters = this.checkIfStringContainsBlacklistedCharacters(value);
    if (!validationBlacklistedCharacters.isValid) {
      return validationBlacklistedCharacters;
    }

    const validationOverlappingPairs = this.checkIfStringContainsTwoOverlappingPairs(value);
    if (!validationOverlappingPairs.isValid) {
      return validationOverlappingPairs;
    }

    const validationOverMaxLength = this.checkIfStringIsAboveMaxLength(value);
    if (!validationOverMaxLength.isValid) {
      return validationOverMaxLength;
    }

    const validationHasUppercase = this.checkIfStringHasUpperCase(value);
    if (!validationHasUppercase.isValid) {
      return validationHasUppercase;
    }

    const validationContainsOnlyLetters = this.checkIfStringContainsOnlyLetters(value);
    if (!validationContainsOnlyLetters.isValid) {
      return validationContainsOnlyLetters;
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
}
