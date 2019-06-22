import LoginValidatorService from "../../services/loginValidator.service";
import locale from "../../locale/en";

describe("services/queue.service.ts", () => {
  let loginValidator: LoginValidatorService = new LoginValidatorService();

  beforeEach(() => {
    loginValidator = new LoginValidatorService();
  });

  it("Validates username correctly", () => {
    const validUsername = "User";
    const usernameValid = loginValidator.checkUsername(validUsername);
    expect(usernameValid.isValid).toBe(true);

    const invalidUsername = "";
    const usernameInvalid = loginValidator.checkUsername(invalidUsername);
    expect(usernameInvalid.isValid).toBe(false);
  });

  it("Validates valid password correctly", () => {
    const validPassword = "kkabcdd";
    const usernameValid = loginValidator.checkUsername(validPassword);
    expect(usernameValid.isValid).toBe(true);
  });

  it("Validates password correctly - isEmptyPassword", () => {
    const validPassword = "a";
    let validationEmpty = loginValidator.checkIfStringIsEmpty(validPassword);
    expect(validationEmpty.isValid).toBe(true);

    const invalidPassword = "";
    validationEmpty = loginValidator.checkIfStringIsEmpty(invalidPassword);
    expect(validationEmpty.isValid).toBe(false);

    const passwordIsValid = loginValidator.checkPassword(invalidPassword);
    expect(passwordIsValid.isValid).toBe(false);
    expect(passwordIsValid.message).toEqual(locale.validationErrors.isEmptyPassword);
  });

  it("Validates incorrect - containsAlphabetSequence", () => {
    const incorrectPassword = "a";
    const passwordIsValid = loginValidator.checkPassword(incorrectPassword);

    expect(passwordIsValid.isValid).toBe(false);
    expect(passwordIsValid.message).toEqual(locale.validationErrors.containsAlphabetSequence);
  });
});
