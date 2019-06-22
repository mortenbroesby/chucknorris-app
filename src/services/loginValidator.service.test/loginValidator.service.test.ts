import LoginValidatorService from "../../services/loginValidator.service";

describe("services/queue.service.ts", () => {
  let loginValidator: LoginValidatorService = new LoginValidatorService();

  beforeEach(() => {
    loginValidator = new LoginValidatorService();
  });

  it("Validates username correctly", () => {
    const correctUsername = "User";
    const usernameValid = loginValidator.checkUsername(correctUsername);
    expect(usernameValid.isValid).toBe(true);

    const incorrectUsername = "";
    const usernameInvalid = loginValidator.checkUsername(incorrectUsername);
    expect(usernameInvalid.isValid).toBe(false);
  });
});
