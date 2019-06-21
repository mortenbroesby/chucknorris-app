import Logger from "js-logger";
import { UserCredentials } from "../interfaces";

export default class LoginValidatorService {
  checkCredentials(credentials: UserCredentials) {
    return new Promise((resolve, reject) => {
      const username = this.checkUsername(credentials.username);
      const password = this.checkPassword(credentials.password);

      if (username && password) {
        resolve(this.saltLoginCredentials(credentials));
      } else {
        reject(`Invalid credentials: ${JSON.stringify(credentials)}`);
      }
    });
  }

  checkUsername(value: string) {
    return true;
  }

  checkPassword(value: string) {
    return true;
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
