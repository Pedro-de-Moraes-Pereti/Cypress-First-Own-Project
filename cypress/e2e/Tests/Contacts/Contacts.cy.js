import contacts from "../../../fixtures/Contacts/contactsFixture";

const selectors = {
  selectBox: ".select-box-text",
  customLabel: ".custom_checkmark",
  Button: ".btn-submit",
  selectorsLoop: (sel) => `[name="${sel}"]`,
};

describe("contacts page", () => {
  beforeEach(() => {
    cy.login();
    cy.contacts();
  });

  it(`Check the ${contacts.cases} flow of the contacts`, () => {
    // select one gender
    cy.get(selectors.selectBox)
      .contains(contacts.boxSelect)
      .next()
      .select(contacts.genderSelect);

    // type a name
    contacts.contactsInfo.forEach((data) => {
      cy.get(selectors.selectorsLoop(data.selectors)).type(data.label);
    });

    // select checkbox
    cy.get(selectors.customLabel).click({ multiple: true });

    // confirm button exist
    cy.get(selectors.Button).contains(contacts.buttonVerzenden).should("exist");
  });
});

