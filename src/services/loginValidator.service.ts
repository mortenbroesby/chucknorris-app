import Logger from "js-logger";

import {
  UserCredentials,
  InputValidationMessage,
} from "../interfaces";

import {
  stringIsEmpty,
  stringHasUpperCase,
  stringContainsOnlyLetters,
} from "../utilities";

export default class LoginValidatorService {
  checkCredentials(credentials: UserCredentials): Promise<UserCredentials> {
    return new Promise((resolve, reject) => {
      const usernameCheck = this.checkUsername(credentials.username);
      const passwordCheck = this.checkPassword(credentials.password);

      if (usernameCheck.isValid && passwordCheck.isValid) {
        resolve(this.saltLoginCredentials(credentials));
      } else {
        if (!usernameCheck.isValid) {
          reject(usernameCheck);
        } else {
          reject(passwordCheck);
        }
      }
    });
  }

  checkUsername(value: string): InputValidationMessage {
    if (stringIsEmpty(value)) {
      Logger.info("Usernames cannot be empty.");
      return {
        isValid: false,
        message: "Usernames cannot be empty."
      };
    }

    return {
      isValid: true
    };
  }

  checkPassword(value: string): InputValidationMessage {
    // Passwords cannot be empty.
    if (stringIsEmpty(value)) {
      Logger.info("Passwords cannot be empty.");
      return {
        isValid: false,
        message: "Passwords cannot be empty."
      };
    }

    // Passwords cannot be longer than 32 characters.
    if (value.length > 32) {
      Logger.info("Passwords cannot be longer than 32 characters.");
      return {
        isValid: false,
        message: "Passwords cannot be longer than 32 characters."
      };
    }

    // Passwords can only contain lower case alphabetic characters.
    if (stringHasUpperCase(value)) {
      Logger.info("Passwords can only contain lower case characters.");
      return {
        isValid: false,
        message: "Passwords can only contain lower case characters."
      };
    } else if (!stringContainsOnlyLetters(value)) {
      Logger.info("Passwords can only contain alphabetic characters.");
      return {
        isValid: false,
        message: "Passwords can only contain alphabetic characters."
      };
    }

    return {
      isValid: true
    };
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
}
