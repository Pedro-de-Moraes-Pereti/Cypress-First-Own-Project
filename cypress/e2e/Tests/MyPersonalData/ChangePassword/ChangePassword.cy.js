import passwordCh from "../../../../fixtures/MyPersonalData/ChangePassword/changePasswordFixture";

const selectors = {
  password: "#password",
  newPassword: "#new_password1",
  newPassword2: "#new_password2",
  passwordError: '[id="password-error"]',
  newPasswordError: '[id="new_password1-error"]',
  newPasswordError2: '[id="new_password2-error"]',
  buttonContainer: ".button-container",
  classErr: '[class="error"]',
  selNewPassword: (pass) => `#${pass}`,
};

describe("change password page ", () => {
  beforeEach(() => {
    cy.login();

    // my details button
    cy.contains("a", passwordCh.mijnGegevens).click();

    // redirect to password page 
    cy.contains("a", passwordCh.changePassword).click();
  });

  it("check incorrect password fields", () => {
    // button alert messages
    cy.get(selectors.buttonContainer)
      .find(passwordCh.button)
      .click()
      .then(() => {
        // alert for required password
        cy.get(selectors.newPasswordError)
          .contains(passwordCh.passwordRequired)
          .and("be.visible");

        // alert for password
        cy.get(selectors.newPasswordError2)
          .contains(passwordCh.repeatPassword)
          .and("be.visible");

        // alert for password
        cy.get(selectors.passwordError)
          .contains(passwordCh.currentPassword)
          .and("be.visible");
      });
  });

  it(" incorrect password fields ", () => {
    passwordCh.changePasswordFixture.forEach((data) => {
      // type correct personal details
      cy.get(selectors.selNewPassword(data.selectPassword))
        .clear()
        .type(data.dataPassword);

      // click login button
      cy.get(selectors.buttonContainer)
        .find(passwordCh.button)
        .click()
        .then(() => {});
    });

    // alert for password
    cy.get(selectors.newPasswordError)
      .contains(passwordCh.less8password)
      .should("be.visible");

    // alert for password does not match
    cy.get(selectors.newPasswordError2)
      .contains(passwordCh.passwordNoMatch)
      .should("be.visible");
  });

  it("enter a incorrect current password", () => {
    // alert for new password
    cy.get(selectors.newPassword).type(passwordCh.idPasswordTest);

    // alert for new password
    cy.get(selectors.newPassword2).type(passwordCh.idPassword);

    // alert for confirm new password
    cy.get(selectors.password).type(passwordCh.idWrongPassword);

    // button to confirm change
    cy.get(selectors.buttonContainer)
      .find(passwordCh.button)
      .click()
      .then(() => {
        // alert for password error
        cy.get(selectors.classErr)
          .contains(passwordCh.classError)
          .should("be.visible");
      });
  });

  it("enter a correct password", () => {
    // enter new password
    cy.get(selectors.newPassword).type(passwordCh.idNewPassword);

    // enter new password
    cy.get(selectors.newPassword2).type(passwordCh.idNewPasswordConfirm);

    // enter current password
    cy.get(selectors.password).type(passwordCh.idCurrentPassword);

    // button to confirm change
    cy.get(selectors.buttonContainer).find(passwordCh.button).click();
  });
});
