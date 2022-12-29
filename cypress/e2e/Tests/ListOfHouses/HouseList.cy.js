import houseListData from "../../../fixtures/HouseList/HouseListFixture";

const selectors = {
  addresS: ".address",
  customLabel: ".custom_checkbox_container",
  selectBox: ".select-box-text",
  inputText: "input[type=text]",
  citySelect: "Breda",
  houseType: "Appartement",
  alertWarn: ".alert.alert-warning",
  selectorsLoop: (sel) => `[name="${sel}"]`,
};

describe("House List page", () => {
  beforeEach(() => {
    cy.login();
  });

  it(`Check the ${houseListData.cases} Flow of the Contacts`, () => {
    // opens the account config
    cy.contains("li", houseListData.backWebButton).click();

    // open House list
    cy.contains("a", houseListData.aanbodButton).click({ force: true });

    // write the address exemple
    cy.get(selectors.inputText).type(houseListData.textAdress);

    // select the city
    cy.get(selectors.selectBox)
      .contains(houseListData.city)
      .next()
      .select(houseListData.citySelect);

    // choose the house type
    cy.get(selectors.selectBox)
      .contains(houseListData.houseChoice)
      .next()
      .select(houseListData.houseType);

    houseListData.choiceList.forEach((data) => {
      // select house price
      cy.get(data.selectors).contains(data.contains).click();

      // select one house type
      cy.get(selectors.selectorsLoop(data.selectMin)).select(data.contentMin);

      // loop for the containers
      cy.get(selectors.selectorsLoop(data.selectMax)).select(data.contentMax);
    });

    // select all the checkbox presented
    cy.get(selectors.customLabel).click({ multiple: true });

    // alert warn
    cy.get(selectors.alertWarn)
      .contains(houseListData.alertPage)
      .should("be.visible");
  });
});
