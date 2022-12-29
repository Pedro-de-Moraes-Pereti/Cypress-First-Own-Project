import login from "../../../fixtures/Login/loginFixture";

const selectors = {
  password: "#password",
  buttonContainer: ".button-container",
  classErr: '[class="error"]',
  buttonMenu: ".menu-button",
  selLog: (log) => `#${log}`,
};

describe("login page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(selectors.buttonMenu).click();

    // should click to login a user
    cy.contains("a", login.inloggenSelect).click();
  });

  it("check elements", () => {
    // loop select the fields
    login.loginData1.forEach((data) => {
      cy.get(selectors.selLog(data.selectEmailPassword)).clear();
    });
  });

  it("show elements", () => {
    // select wrong elemets
    login.loginData2.forEach((data) => {
      // show wrong elements
      cy.get(selectors.buttonContainer)
        .find(login.button)
        .click()
        .then(() => {
          cy.get(selectors.selLog(data.selectEmailPassword))
            .contains(data.errorMessage)
            .and("be.visible");
        });
    });
  });

  it(" incorrect email ", () => {
    // type correct personal data
    login.loginData3.forEach((data) => {
      cy.get(selectors.selLog(data.selectEmailPassword))
        .clear()
        .type(data.dataLogin);

      // click login button
      cy.get(selectors.buttonContainer).find(login.button).click();
    });

    // typed an incorrect email
    cy.get(selectors.classErr)
      .contains(login.incorrectMail)
      .should("be.visible");
  });

  it(" incorrect email or password", () => {
    // type correct personal details
    login.loginData4.forEach((data) => {
      cy.get(selectors.selLog(data.selectEmailPassword))
        .clear()
        .type(data.dataLogin);

      // click login button
      cy.get(selectors.buttonContainer).find(login.button).click();
    });
    // email or password no match
    cy.get(selectors.classErr).contains(login.emailPass).should("be.visible");
  });

  it("enter correct email and password", () => {
    // type correct personal details
    login.loginData5.forEach((data) => {
      cy.get(selectors.selLog(data.selectEmailPassword))
        .clear()
        .type(data.dataLogin);

      // click login button
      cy.get(selectors.buttonContainer).find(login.button).click();
    });
  });
});
