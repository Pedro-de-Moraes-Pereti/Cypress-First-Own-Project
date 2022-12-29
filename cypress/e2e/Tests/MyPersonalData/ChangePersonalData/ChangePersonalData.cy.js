import personal from "../../../../fixtures/MyPersonalData/ChangePersonalData/ChangePersonalDataFixture";

const selectors = {
  selectContainer: "#select2-language-container",
  selectCountry: "#select2-country-container",
  passwordData: '[id="password"]',
  buttonContainer: ".button-container",
  idPassword: '[id="password"]',
  classError: '[class="error"]',
  selPersonal: (pers) => `#${pers}`,
};

describe("change personal data page", () => {
  beforeEach(() => {
    cy.login();

    // open My Personal Data
    cy.contains("a", personal.myData).click();

    // update personal details
    cy.contains("a", personal.updatePersonalData).click();
  });

  it("incorrect first name and last name", () => {
    // select the fields
    personal.personalData1.forEach((data) => {
      cy.get(selectors.selPersonal(data.selectors)).clear();
    });

    // show wrong elements
    cy.get(selectors.buttonContainer)
      .find(personal.findButton)
      .click()
      .then(() => {
        // select the wrong elemets
        personal.personalData2.forEach((data) => {
          cy.get(selectors.selPersonal(data.selectors))
            .contains(data.value)
            .and("be.visible");
        });
      });
  });

  it("incorrect password", () => {
    // type a wrong password
    cy.get(selectors.idPassword).clear().type(personal.wrongPassword);

    // confirm wrong password
    cy.get(selectors.buttonContainer)
      .find(personal.findButton)
      .click() 
      .then(() => {
        // element incorrect passord
        cy.get(selectors.classError)
          .contains(personal.incorrectPassword)
          .and("be.visible");
      });
  });

  it("enter correct personal data", () => {
    // type correct personal details
    personal.personalData3.forEach((data) => {
      cy.get(selectors.selPersonal(data.selectors)).clear().type(data.value);
    });

    //  select an country
    cy.get(selectors.selectCountry).type(personal.Nederland).click();

    // select a language
    cy.contains(selectors.selectContainer, personal.languageDutch).click();

    // type an password
    cy.get(selectors.passwordData).clear().type(personal.correctPassword);

    // confirm button exist
    cy.contains("button", personal.save).should("exist");
  });
});
