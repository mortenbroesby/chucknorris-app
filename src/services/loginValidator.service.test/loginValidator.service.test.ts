import LoginValidatorService from "../../services/loginValidator.service";
import locale from "../../locale/en";

const STATIC_VALID_PASSWORD = "abcdefaabb";

describe("services/queue.service.ts", () => {
  let loginValidator: LoginValidatorService = new LoginValidatorService();

  beforeEach(() => {
    loginValidator = new LoginValidatorService();
  });

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
    const usernameValid = loginValidator.checkUsername(validPassword);
    expect(usernameValid.isValid).toBe(true);
  });

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

  it("Returns valid salted credentials", () => {
    const saltedCredentials = loginValidator.saltLoginCredentials({
      username: "test",
      password: STATIC_VALID_PASSWORD
    });

    expect(saltedCredentials.username).toBe("test");
    expect(saltedCredentials.password).not.toBe(STATIC_VALID_PASSWORD);
  });
});
