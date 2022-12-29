import forgotPassword from "../../../fixtures/ForgotPassord/ForgotPasswordFixture";

const selectors = {
  menuButton: ".menu-button",
  idEmail: '[id="email"]',
};

describe("Forgot your password page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("check incorrect email and password", () => {
    // open menu
    cy.get(selectors.menuButton).click();

    // click to login a user
    cy.contains("a", forgotPassword.login).click();

    // click  button "forgot password"
    cy.contains("a", forgotPassword.forgotPasswordAlert).click();

    // type an email
    cy.get(selectors.idEmail).type(forgotPassword.testEmail);

    // confirm button "new password"
    cy.contains("button", forgotPassword.buttonNewPass).should("exist");
  });
});
