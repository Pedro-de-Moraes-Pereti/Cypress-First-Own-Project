import emaill from "../../../../fixtures/MyPersonalData/ChangeEmail/ChangeEmailFixture";

const selectors = {
  password: "#password",
  classErr: '[class="error"]', 
  idEmail: '[id="email"]',
  buttonContainer: ".button-container",
  idErrorMail: '[id="email-error"]',
  idPasswordError: '[id="password-error"]',
  idPassword: '[id="password"]', 
  ChangeMail: (email) => `#${email}`,
};

describe("Change email page", () => {
  beforeEach(() => {
    cy.login();

    // click to open a my details
    cy.contains("a", emaill.mijnGegevens).click();

    // click to open a user register form
    cy.contains("a", emaill.emailVeranderen).click();

    // click and show wrong elements
    cy.contains("button", emaill.save).click();
  });

  it("check incorrect email and password", () => {
    // clear email field
    cy.get(selectors.idEmail).clear();

    // click to show messages elements
    cy.get(selectors.buttonContainer)
      .find(emaill.button)
      .click()
      .then(() => {
        // alert for required email
        cy.get(selectors.idErrorMail)
          .contains(emaill.requiredMail)
          .and("be.visible");

        // alert for password
        cy.get(selectors.idPasswordError)
          .contains(emaill.passRequired)
          .and("be.visible");
      });
  });

  it(" incorrect email ", () => {
    // type correct personal details
    emaill.emailError.forEach((data) => {
      cy.get(selectors.ChangeMail(data.selectEmail))
        .clear()
        .type(data.emailPasswordData);

      // click login button
      cy.get(selectors.buttonContainer).find(emaill.button).click();
    });

    // show a element message
    cy.get(selectors.classErr)
      .contains(emaill.incorrectMail)
      .should("be.visible");
  });

  it("enter a incorrect password", () => {
    // type a email
    cy.get(selectors.idEmail).clear().type(emaill.email);

    // type a password
    cy.get(selectors.idPassword).type(emaill.passIncorrect);

    // click confirm button
    cy.get(selectors.buttonContainer)
      .find(emaill.button)
      .click()
      .then(() => {
        // show a incorrect password message
        cy.get(selectors.classErr)
          .contains(emaill.incorrectPassword)
          .should("be.visible");
      });
  });

  it("correct account and password", () => {
    // type a email
    cy.get(selectors.idEmail).clear().type(emaill.email);

    // type a password
    cy.get(selectors.idPassword).type(emaill.password);

    // click confirm button
    cy.get(selectors.buttonContainer).find(emaill.button).click();
  });
});
