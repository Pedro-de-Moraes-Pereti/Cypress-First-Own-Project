import deleteAccount from "../../../fixtures/DeleteAccount/DeleteAccountFixture";

const selectors = {
  labelControl: ".custom-control-label",
};

describe("Delete Account page", () => {
  beforeEach(() => {
    cy.login();
  });

  it("delete Account", () => {
    // click my information button
    cy.contains("a", deleteAccount.mijnGegevens).click();

    // select the delete button
    cy.contains("a", deleteAccount.removeAccount).click();

    // select the checkbox
    cy.get(selectors.labelControl).click();

    // confirm button exist
    cy.contains("a", deleteAccount.buttonAnnuleren).should("exist");
  });
});
