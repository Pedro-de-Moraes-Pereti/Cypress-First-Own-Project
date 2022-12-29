import registers from "../../../fixtures/Register/RegisterFixture";

const selectors = {
  selectContainer: "#select2-country-container",
  buttonContainer: ".button-container",
  idEmailError: '[id="email-error"]',
  selRegister: (err) => `#${err}`,
};
 
describe("register page", () => {
  beforeEach(() => {
    cy.loginBtn();
  });

  it("incorrect first name and last name", () => {
    // select the fields
    registers.registerData.forEach((data) => {
      cy.get(selectors.selRegister(data.selectForm)).clear();

      // alert message
      cy.get(selectors.buttonContainer)
        .find(registers.button)
        .click()
        .then(() => {});
    });

    // alert message
    registers.registerError.forEach((data) => {
      cy.get(selectors.selRegister(data.selectForm))
        .contains(data.dataForm)
        .and("be.visible");
    });
  });

  it("enter incorrect personal data", () => {
    registers.registerInorrectData.forEach((data) => {
      // type correct personal details
      cy.get(selectors.selRegister(data.selectForm))
        .clear()
        .type(data.dataForm);
    });

    // Alert of used email
    cy.get(selectors.idEmailError)
      .contains(registers.usedEmail)
      .and("be.visible");
  });

  it("enter correct personal data", () => {
    // type correct personal details
    registers.registerCorrect.forEach((data) => {
      cy.get(selectors.selRegister(data.selectForm))
        .clear()
        .type(data.dataForm);
    });

    // select country
    cy.get(selectors.selectContainer).type(registers.countrySelector).click();

    // button to confirm
    cy.contains("button", registers.registerSelector).should("be.exist");
  });
});
