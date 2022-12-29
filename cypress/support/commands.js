// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


const selectors = {
  menuButton: '.menu-button',
  btnContainer: '.button-container'
}


Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')

  // should open the menu
  cy.get('.menu-button').click()

  // should click to login a user
  cy.contains('a', 'Inloggen').click()

  // this code is used to show the messsages that appear at the email and password boxes
  cy.get('.button-container').find('button').click()

  // this code is to show a real email to login
  cy.get('#email').clear().type('pedrodemoraes5@gmail.com')

  // this code is to show a real password
  cy.get('#password').clear().type('12345678')

  // should click to login a user
  cy.get('.button-container').find('button').click()
})

Cypress.Commands.add('loginBtn', () => {
  cy.visit('/')
  
  // should open the menu
  cy.get(selectors.menuButton).click()

  // should click to login a user
  cy.contains('a', 'Inloggen').click()

  // this click to open a user register form
  cy.get(selectors.btnContainer).find('a').click()
})

Cypress.Commands.add('contacts', () => {
  // this click to open a user register form
  cy.contains('li', 'Terug naar de website').click()

  cy.get('.menu-button').click()

  // this code is to open the research page for Blok T type 
  cy.contains('a', 'Contact').click({ force: true })
})

