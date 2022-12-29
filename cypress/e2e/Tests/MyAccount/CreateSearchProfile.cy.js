import profile from "../../../fixtures/MyAccount/CreateProfileFixture";

// this code is used to hlp
const selectors = {
  textTitle: "#title",
  customLabel: ".custom-control-label",
  TyRadio: '[type="radio"]',
  buttonContainer: ".button-container",
  selProf: (createProf) => `#${createProf}`,
};

describe("Create An Account page", () => {
  beforeEach(() => {
    cy.login();
    cy.contains("a", profile.zoek).click();  
  });

  it("Check the  Flow of the Create Account", () => {
    // type a title
    cy.get(selectors.textTitle).clear().type(profile.data);

    // select the dropdown box
    cy.get(selectors.TyRadio).check(profile.rentals).click({ multiple: true });

    profile.createProfileFixture.forEach((data) => {
      //  type at the box my name
      cy.get(selectors.selProf(data.selectOption)).select(data.content, {
        force: true,
      });
    });

    // select check box
    cy.get(selectors.customLabel).click({ multiple: true });

    // click button
    cy.get(selectors.buttonContainer).find(profile.Button).should("exist");
  });
});
