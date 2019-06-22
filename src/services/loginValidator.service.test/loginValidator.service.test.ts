import LoginValidatorService from "../../services/loginValidator.service";
import locale from "../../locale/en";
import { UserCredentials, ErrorToastMessage } from "@/interfaces";
import { InputFieldType } from "@/enums";

const STATIC_VALID_PASSWORD = "abcdefaabb";

describe("services/queue.service.ts", () => {
  /*************************************************/
  /* SETUP */
  /*************************************************/
  let loginValidator: LoginValidatorService = new LoginValidatorService();

  beforeEach(() => {
    loginValidator = new LoginValidatorService();
  });

  /*************************************************/
  /* MAIN VALIDATION */
  /*************************************************/
  it("Validates valid and invalid username correctly", () => {
    const validUsername = "User";
    const usernameValid = loginValidator.checkUsername(validUsername);
    expect(usernameValid.isValid).toBe(true);

    const invalidUsername = "";
    const usernameInvalid = loginValidator.checkUsername(invalidUsername);
    expect(usernameInvalid.isValid).toBe(false);
  });

  it("Validates a valid password correctly", () => {
    const validPassword = STATIC_VALID_PASSWORD;
    const usernameValid = loginValidator.checkPassword(validPassword);
    expect(usernameValid.isValid).toBe(true);
  });

  it("Validates a an invalid password correctly - isEmptyPassword", () => {
    const invalidPassword = "";
    const validation = loginValidator.checkPassword(invalidPassword);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toEqual(locale.validationErrors.isEmptyPassword);
  });

  it("Validates a an invalid password correctly - containsAlphabetSequence", () => {
    const invalidPassword = "aaaa";
    const validation = loginValidator.checkPassword(invalidPassword);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toEqual(locale.validationErrors.containsAlphabetSequence);
  });

  it("Validates a an invalid password correctly - containsBlacklistedCharacters", () => {
    const invalidPassword = "abcO";
    const validation = loginValidator.checkPassword(invalidPassword);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toEqual(locale.validationErrors.containsBlacklistedCharacters);
  });

  it("Validates a an invalid password correctly - containsOverlappingPairs", () => {
    const invalidPassword = "abcaaaaa";
    const validation = loginValidator.checkPassword(invalidPassword);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toEqual(locale.validationErrors.containsOverlappingPairs);
  });

  it("Validates a an invalid password correctly - isAboveMaxLength", () => {
    const invalidPassword = "abcaabbabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc";
    const validation = loginValidator.checkPassword(invalidPassword);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toEqual(locale.validationErrors.isAboveMaxLength);
  });

  it("Validates a an invalid password correctly - hasUppercase", () => {
    const invalidPassword = "abcaabbHU";
    const validation = loginValidator.checkPassword(invalidPassword);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toEqual(locale.validationErrors.hasUppercase);
  });

  it("Validates a an invalid password correctly - containsOnlyLetters", () => {
    const invalidPassword = "abcaabb$@";
    const validation = loginValidator.checkPassword(invalidPassword);
    expect(validation.isValid).toBe(false);
    expect(validation.message).toEqual(locale.validationErrors.containsOnlyLetters);
  });

  /*************************************************/
  /* PARTIALS VALIDATION */
  /*************************************************/
  it("Validates password partial correctly - isEmptyPassword", () => {
    const validPassword = STATIC_VALID_PASSWORD;
    let validationEmpty = loginValidator.checkIfStringIsEmpty(validPassword);
    expect(validationEmpty.isValid).toBe(true);

    const invalidPassword = "";
    validationEmpty = loginValidator.checkIfStringIsEmpty(invalidPassword);
    expect(validationEmpty.isValid).toBe(false);
    expect(validationEmpty.message).toEqual(locale.validationErrors.isEmptyPassword);
  });

  it("Validates password partial correctly - containsAlphabetSequence", () => {
    const validPassword = STATIC_VALID_PASSWORD;
    let validationEmpty = loginValidator.checkIfStringContainsAlphabetSequence(validPassword);
    expect(validationEmpty.isValid).toBe(true);

    const invalidPassword = "aaaa";
    validationEmpty = loginValidator.checkIfStringContainsAlphabetSequence(invalidPassword);
    expect(validationEmpty.isValid).toBe(false);
    expect(validationEmpty.message).toEqual(locale.validationErrors.containsAlphabetSequence);
  });

  it("Validates password partial correctly - containsBlacklistedCharacters", () => {
    const validPassword = STATIC_VALID_PASSWORD;
    let validationEmpty = loginValidator.checkIfStringContainsBlacklistedCharacters(validPassword);
    expect(validationEmpty.isValid).toBe(true);

    const invalidPassword = "abcO";
    validationEmpty = loginValidator.checkIfStringContainsBlacklistedCharacters(invalidPassword);
    expect(validationEmpty.isValid).toBe(false);
    expect(validationEmpty.message).toEqual(locale.validationErrors.containsBlacklistedCharacters);
  });

  it("Validates password partial correctly - containsOverlappingPairs", () => {
    const validPassword = STATIC_VALID_PASSWORD;
    let validationEmpty = loginValidator.checkIfStringContainsTwoOverlappingPairs(validPassword);
    expect(validationEmpty.isValid).toBe(true);

    const invalidPassword = "abababab";
    validationEmpty = loginValidator.checkIfStringContainsTwoOverlappingPairs(invalidPassword);
    expect(validationEmpty.isValid).toBe(false);
    expect(validationEmpty.message).toEqual(locale.validationErrors.containsOverlappingPairs);
  });

  it("Validates password partial correctly - isAboveMaxLength", () => {
    const validPassword = STATIC_VALID_PASSWORD;
    let validationEmpty = loginValidator.checkIfStringIsAboveMaxLength(validPassword);
    expect(validationEmpty.isValid).toBe(true);

    const invalidPassword = "abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababab";
    validationEmpty = loginValidator.checkIfStringIsAboveMaxLength(invalidPassword);
    expect(validationEmpty.isValid).toBe(false);
    expect(validationEmpty.message).toEqual(locale.validationErrors.isAboveMaxLength);
  });

  it("Validates password partial correctly - hasUppercase", () => {
    const validPassword = STATIC_VALID_PASSWORD;
    let validationEmpty = loginValidator.checkIfStringHasUpperCase(validPassword);
    expect(validationEmpty.isValid).toBe(true);

    const invalidPassword = "abcabcaabbHHJJ";
    validationEmpty = loginValidator.checkIfStringHasUpperCase(invalidPassword);
    expect(validationEmpty.isValid).toBe(false);
    expect(validationEmpty.message).toEqual(locale.validationErrors.hasUppercase);
  });

  it("Validates password partial correctly - containsOnlyLetters", () => {
    const validPassword = STATIC_VALID_PASSWORD;
    let validationEmpty = loginValidator.checkIfStringContainsOnlyLetters(validPassword);
    expect(validationEmpty.isValid).toBe(true);

    const invalidPassword = "abcabcaabb$$2";
    validationEmpty = loginValidator.checkIfStringContainsOnlyLetters(invalidPassword);
    expect(validationEmpty.isValid).toBe(false);
    expect(validationEmpty.message).toEqual(locale.validationErrors.containsOnlyLetters);
  });

  /*************************************************/
  /* PUBLIC FUNCTIONS */
  /*************************************************/
  it("Checks credentials correctly for valid password", (done) => {
    loginValidator.checkCredentials({
      username: "testUser",
      password: STATIC_VALID_PASSWORD,
    }).then((credentials: UserCredentials) => {
      expect(credentials.username).toBe("testUser");
      done();
    }).catch((rejection: ErrorToastMessage) => {
      done.fail(new Error("Valid credentials check failed"));
    });
  });

  it("Checks credentials correctly for invalid password", (done) => {
    loginValidator.checkCredentials({
      username: "testUser",
      password: "",
    }).then(() => {
      done.fail(new Error("Invalid credentials check failed"));
    }).catch((rejection: ErrorToastMessage) => {
      expect(rejection.inputField).toBe(InputFieldType.password);
      expect(rejection.validation.isValid).toBe(false);
      expect(rejection.validation.message).toBe(locale.validationErrors.isEmptyPassword);
      done();
    });
  });

  it("Returns valid salted credentials", () => {
    const saltedCredentials = loginValidator.saltLoginCredentials({
      username: "test",
      password: STATIC_VALID_PASSWORD
    });

    expect(saltedCredentials.username).toBe("test");
    expect(saltedCredentials.password).not.toBe(STATIC_VALID_PASSWORD);
  });

  /*************************************************/
  /* HELPER FUNCTIONS */
  /*************************************************/
  it("Returns valid genericSuccessMessage", () => {
    let successMessage = loginValidator.genericSuccessMessage();
    expect(successMessage.isValid).toBe(true);
    expect(successMessage.message).toBe(undefined);
  });

  it("Returns valid genericErrorMessage", () => {
    let errorMessage = loginValidator.genericErrorMessage("abc");
    expect(errorMessage.isValid).toBe(false);
    expect(errorMessage.message).toBe("abc");
  });
});
